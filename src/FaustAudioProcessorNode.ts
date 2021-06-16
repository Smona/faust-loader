import { AudioWorkletNode, IAudioContext } from "standardized-audio-context";

export default function getClass() {
  if (typeof AudioWorkletNode !== "undefined") {
    return class FaustAudioProcessorNode extends AudioWorkletNode<IAudioContext> {
      private json: string;
      private json_object: Record<string, any>;

      constructor(context: IAudioContext, name: string, nodeOptions) {
        super(context, name, nodeOptions);

        this.json = nodeOptions.processorOptions.json;
        this.json_object = JSON.parse(this.json);

        // JSON parsing functions
        this.parse_ui = function (ui, obj) {
          for (var i = 0; i < ui.length; i++) {
            this.parse_group(ui[i], obj);
          }
        };

        this.parse_group = function (group, obj) {
          if (group.items) {
            this.parse_items(group.items, obj);
          }
        };

        this.parse_items = function (items, obj) {
          for (var i = 0; i < items.length; i++) {
            this.parse_item(items[i], obj);
          }
        };

        this.parse_item = function (item, obj) {
          if (
            item.type === "vgroup" ||
            item.type === "hgroup" ||
            item.type === "tgroup"
          ) {
            this.parse_items(item.items, obj);
          } else if (item.type === "hbargraph" || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
          } else if (
            item.type === "vslider" ||
            item.type === "hslider" ||
            item.type === "button" ||
            item.type === "checkbox" ||
            item.type === "nentry"
          ) {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.descriptor.push(item);
            // Decode MIDI
            if (item.meta !== undefined) {
              for (var i = 0; i < item.meta.length; i++) {
                if (item.meta[i].midi !== undefined) {
                  if (item.meta[i].midi.trim() === "pitchwheel") {
                    obj.fPitchwheelLabel.push({
                      path: item.address,
                      min: parseFloat(item.min),
                      max: parseFloat(item.max),
                    });
                  } else if (
                    item.meta[i].midi.trim().split(" ")[0] === "ctrl"
                  ) {
                    obj.fCtrlLabel[
                      parseInt(item.meta[i].midi.trim().split(" ")[1])
                    ].push({
                      path: item.address,
                      min: parseFloat(item.min),
                      max: parseFloat(item.max),
                    });
                  }
                }
              }
            }
            // Define setXXX/getXXX, replacing '/c' with 'C' everywhere in the string
            var set_name = "set" + item.address;
            var get_name = "get" + item.address;
            set_name = set_name.replace(/\/./g, (x) => {
              return x.substr(1, 1).toUpperCase();
            });
            get_name = get_name.replace(/\/./g, (x) => {
              return x.substr(1, 1).toUpperCase();
            });
            obj[set_name] = (val) => {
              obj.setParamValue(item.address, val);
            };
            obj[get_name] = () => {
              return obj.getParamValue(item.address);
            };
            //console.log(set_name);
            //console.log(get_name);
          }
        };

        this.output_handler = null;

        // input/output items
        this.inputs_items = [];
        this.outputs_items = [];
        this.descriptor = [];

        // MIDI
        this.fPitchwheelLabel = [];
        this.fCtrlLabel = new Array(128);
        for (var i = 0; i < this.fCtrlLabel.length; i++) {
          this.fCtrlLabel[i] = [];
        }

        // Parse UI
        this.parse_ui(this.json_object.ui, this);

        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);
        try {
          if (this.parameters)
            this.parameters.forEach((p) => (p.automationRate = "k-rate"));
        } catch (e) {}
      }

      // To be called by the message port with messages coming from the processor
      handleMessage(event) {
        var msg = event.data;
        if (this.output_handler) {
          this.output_handler(msg.path, msg.value);
        }
      }

      /**
       * Destroy the node, deallocate resources.
       */
      destroy() {
        this.port.postMessage({ type: "destroy" });
        this.port.close();
      }

      /**
       *  Returns a full JSON description of the DSP.
       */
      getJSON() {
        return this.json;
      }

      // For WAP
      async getMetadata() {
        return new Promise((resolve) => {
          let real_url =
            this.baseURL === "" ? "main.json" : this.baseURL + "/main.json";
          fetch(real_url)
            .then((responseJSON) => {
              return responseJSON.json();
            })
            .then((json) => {
              resolve(json);
            });
        });
      }

      /**
       *  Set the control value at a given path.
       *
       * @param path - a path to the control
       * @param val - the value to be set
       */
      setParamValue(path, val) {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
      }

      // For WAP
      setParam(path, val) {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
      }

      /**
       *  Get the control value at a given path.
       *
       * @return the current control value
       */
      getParamValue(path: string) {
        return this.parameters.get(path).value;
      }

      // For WAP
      getParam(path: string) {
        return this.parameters.get(path).value;
      }

      /**
       * Setup a control output handler with a function of type (path, value)
       * to be used on each generated output value. This handler will be called
       * each audio cycle at the end of the 'compute' method.
       *
       * @param handler - a function of type function(path, value)
       */
      setOutputParamHandler(handler) {
        this.output_handler = handler;
      }

      /**
       * Get the current output handler.
       */
      getOutputParamHandler() {
        return this.output_handler;
      }

      getNumInputs() {
        return parseInt(this.json_object.inputs);
      }

      getNumOutputs() {
        return parseInt(this.json_object.outputs);
      }

      // For WAP
      inputChannelCount() {
        return parseInt(this.json_object.inputs);
      }

      outputChannelCount() {
        return parseInt(this.json_object.outputs);
      }

      /**
       * Returns an array of all input paths (to be used with setParamValue/getParamValue)
       */
      getParams() {
        return this.inputs_items;
      }

      // For WAP
      getDescriptor() {
        var desc = {};
        for (const item in this.descriptor) {
          if (this.descriptor.hasOwnProperty(item)) {
            if (this.descriptor[item].label != "bypass") {
              desc = Object.assign(
                {
                  [this.descriptor[item].label]: {
                    minValue: this.descriptor[item].min,
                    maxValue: this.descriptor[item].max,
                    defaultValue: this.descriptor[item].init,
                  },
                },
                desc
              );
            }
          }
        }
        return desc;
      }

      /**
       * Control change
       *
       * @param channel - the MIDI channel (0..15, not used for now)
       * @param ctrl - the MIDI controller number (0..127)
       * @param value - the MIDI controller value (0..127)
       */
      ctrlChange(channel, ctrl, value) {
        if (this.fCtrlLabel[ctrl] !== []) {
          for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
            var path = this.fCtrlLabel[ctrl][i].path;
            this.setParamValue(
              path,
              FaustAudioProcessorNode.remap(
                value,
                0,
                127,
                this.fCtrlLabel[ctrl][i].min,
                this.fCtrlLabel[ctrl][i].max
              )
            );
            if (this.output_handler) {
              this.output_handler(path, this.getParamValue(path));
            }
          }
        }
      }

      /**
       * PitchWeel
       *
       * @param channel - the MIDI channel (0..15, not used for now)
       * @param value - the MIDI controller value (0..16383)
       */
      pitchWheel(channel, wheel) {
        for (var i = 0; i < this.fPitchwheelLabel.length; i++) {
          var pw = this.fPitchwheelLabel[i];
          this.setParamValue(
            pw.path,
            FaustAudioProcessorNode.remap(wheel, 0, 16383, pw.min, pw.max)
          );
          if (this.output_handler) {
            this.output_handler(pw.path, this.getParamValue(pw.path));
          }
        }
      }

      /**
       * Generic MIDI message handler.
       */
      midiMessage(data) {
        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf;
        var data1 = data[1];
        var data2 = data[2];

        if (channel === 9) {
          return;
        } else if (cmd === 11) {
          this.ctrlChange(channel, data1, data2);
        } else if (cmd === 14) {
          this.pitchWheel(channel, data2 * 128.0 + data1);
        }
      }

      // For WAP
      onMidi(data) {
        midiMessage(data);
      }

      /**
       * @returns {Object} describes the path for each available param and its current value
       */
      async getState() {
        var params = new Object();
        for (let i = 0; i < this.getParams().length; i++) {
          Object.assign(params, {
            [this.getParams()[i]]: `${this.getParam(this.getParams()[i])}`,
          });
        }
        return new Promise((resolve) => {
          resolve(params);
        });
      }

      /**
       * Sets each params with the value indicated in the state object
       * @param {Object} state
       */
      async setState(state) {
        return new Promise((resolve) => {
          for (const param in state) {
            if (state.hasOwnProperty(param)) this.setParam(param, state[param]);
          }
          try {
            this.gui.setAttribute("state", JSON.stringify(state));
          } catch (error) {
            console.warn("Plugin without gui or GUI not defined", error);
          }
          resolve(state);
        });
      }

      /**
       * A different call closer to the preset management
       * @param {Object} patch to assign as a preset to the node
       */
      setPatch(patch) {
        this.setState(this.presets[patch]);
      }

      static remap(v, mn0, mx0, mn1, mx1) {
        return ((1.0 * (v - mn0)) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
      }
    };
  }

  return null;
}
