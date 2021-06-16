
/*
Code generated with Faust version 2.30.5
Compilation options: -lang wasm-ib -es 1 -scal -ftz 2
*/

function getJSONtmp-607285-t9rqLj7pYW8a() {
	return '{"name": "compressor","filename": "tmp-607285-t9rqLj7pYW8a","version": "2.30.5","compile_options": "-lang wasm-ib -es 1 -scal -ftz 2","library_list": ["/usr/share/faust/stdfaust.lib","/usr/share/faust/demos.lib","/usr/share/faust/maths.lib","/usr/share/faust/platform.lib","/usr/share/faust/compressors.lib","/usr/share/faust/analyzers.lib","/usr/share/faust/signals.lib","/usr/share/faust/basics.lib","/usr/share/faust/routes.lib"],"include_pathnames": ["/usr/share/faust","/usr/local/share/faust","/usr/share/faust","/tmp","/tmp"],"size": 84,"inputs": 2,"outputs": 2,"meta": [ { "analyzers.lib/name": "Faust Analyzer Library" },{ "analyzers.lib/version": "0.1" },{ "author": "JOS, revised by RM" },{ "basics.lib/name": "Faust Basic Element Library" },{ "basics.lib/version": "0.1" },{ "compile_options": "-lang wasm-ib -es 1 -scal -ftz 2" },{ "compressors.lib/compression_gain_mono:author": "Julius O. Smith III" },{ "compressors.lib/compression_gain_mono:copyright": "Copyright (C) 2014-2020 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "compressors.lib/compression_gain_mono:license": "MIT-style STK-4.3 license" },{ "compressors.lib/compressor_stereo:author": "Julius O. Smith III" },{ "compressors.lib/compressor_stereo:copyright": "Copyright (C) 2014-2020 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "compressors.lib/compressor_stereo:license": "MIT-style STK-4.3 license" },{ "compressors.lib/name": "Faust Compressor Effect Library" },{ "compressors.lib/version": "0.1" },{ "description": "Compressor demo application" },{ "filename": "tmp-607285-t9rqLj7pYW8a" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.3" },{ "name": "compressor" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.1" },{ "routes.lib/name": "Faust Signal Routing Library" },{ "routes.lib/version": "0.2" },{ "signals.lib/name": "Faust Signal Routing Library" },{ "signals.lib/version": "0.0" },{ "version": "0.0" }],"ui": [ {"type": "vgroup","label": "COMPRESSOR","meta": [{ "tooltip": "Reference:   http://en.wikipedia.org/wiki/Dynamic_range_compression" }],"items": [ {"type": "hgroup","label": "0x00","meta": [{ "0": "" }],"items": [ {"type": "checkbox","label": "Bypass","address": "/COMPRESSOR/0x00/Bypass","index": 0,"meta": [{ "0": "" },{ "tooltip": "When this is checked, the compressor   has no effect" }]},{"type": "hbargraph","label": "Compressor Gain","address": "/COMPRESSOR/0x00/Compressor_Gain","index": 80,"meta": [{ "1": "" },{ "tooltip": "Current gain of  the compressor in dB" },{ "unit": "dB" }],"min": -50,"max": 10}]},{"type": "hgroup","label": "0x00","meta": [{ "1": "" }],"items": [ {"type": "hgroup","label": "Compression Control","meta": [{ "3": "" }],"items": [ {"type": "hslider","label": "Ratio","address": "/COMPRESSOR/0x00/Compression_Control/Ratio","index": 20,"meta": [{ "0": "" },{ "style": "knob" },{ "tooltip": "A compression Ratio of N means that for each N dB increase in input  signal level above Threshold, the output level goes up 1 dB" }],"init": 5,"min": 1,"max": 20,"step": 0.1},{"type": "hslider","label": "Threshold","address": "/COMPRESSOR/0x00/Compression_Control/Threshold","index": 44,"meta": [{ "1": "" },{ "style": "knob" },{ "tooltip": "When the signal level exceeds the Threshold (in dB), its level  is compressed according to the Ratio" },{ "unit": "dB" }],"init": -30,"min": -100,"max": 10,"step": 0.1}]},{"type": "hgroup","label": "Compression Response","meta": [{ "4": "" }],"items": [ {"type": "hslider","label": "Attack","address": "/COMPRESSOR/0x00/Compression_Response/Attack","index": 16,"meta": [{ "1": "" },{ "scale": "log" },{ "style": "knob" },{ "tooltip": "Time constant in ms (1/e smoothing time) for the compression gain  to approach (exponentially) a new lower target level (the compression  `kicking in\')" },{ "unit": "ms" }],"init": 50,"min": 1,"max": 1000,"step": 0.1},{"type": "hslider","label": "Release","address": "/COMPRESSOR/0x00/Compression_Response/Release","index": 24,"meta": [{ "2": "" },{ "scale": "log" },{ "style": "knob" },{ "tooltip": "Time constant in ms (1/e smoothing time) for the compression gain  to approach (exponentially) a new higher target level (the compression  \'releasing\')" },{ "unit": "ms" }],"init": 500,"min": 1,"max": 1000,"step": 0.1}]}]},{"type": "hslider","label": "Makeup Gain","address": "/COMPRESSOR/Makeup_Gain","index": 4,"meta": [{ "5": "" },{ "tooltip": "The compressed-signal output level is increased by this amount  (in dB) to make up for the level lost due to compression" },{ "unit": "dB" }],"init": 40,"min": -96,"max": 96,"step": 0.1}]}]}';
}
function getBase64Codetmp-607285-t9rqLj7pYW8a() { return "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bHl6ZXJzLmxpYi9uYW1lIjogIkZhdXN0IEFuYWx5emVyIExpYnJhcnkiIH0seyAiYW5hbHl6ZXJzLmxpYi92ZXJzaW9uIjogIjAuMSIgfSx7ICJhdXRob3IiOiAiSk9TLCByZXZpc2VkIGJ5IFJNIiB9LHsgImJhc2ljcy5saWIvbmFtZSI6ICJGYXVzdCBCYXNpYyBFbGVtZW50IExpYnJhcnkiIH0seyAiYmFzaWNzLmxpYi92ZXJzaW9uIjogIjAuMSIgfSx7ICJjb21waWxlX29wdGlvbnMiOiAiLWxhbmcgd2FzbS1pYiAtZXMgMSAtc2NhbCAtZnR6IDIiIH0seyAiY29tcHJlc3NvcnMubGliL2NvbXByZXNzaW9uX2dhaW5fbW9ubzphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJjb21wcmVzc29ycy5saWIvY29tcHJlc3Npb25fZ2Fpbl9tb25vOmNvcHlyaWdodCI6ICJDb3B5cmlnaHQgKEMpIDIwMTQtMjAyMCBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJjb21wcmVzc29ycy5saWIvY29tcHJlc3Npb25fZ2Fpbl9tb25vOmxpY2Vuc2UiOiAiTUlULXN0eWxlIFNUSy00LjMgbGljZW5zZSIgfSx7ICJjb21wcmVzc29ycy5saWIvY29tcHJlc3Nvcl9zdGVyZW86YXV0aG9yIjogIkp1bGl1cyBPLiBTbWl0aCBJSUkiIH0seyAiY29tcHJlc3NvcnMubGliL2NvbXByZXNzb3Jfc3RlcmVvOmNvcHlyaWdodCI6ICJDb3B5cmlnaHQgKEMpIDIwMTQtMjAyMCBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJjb21wcmVzc29ycy5saWIvY29tcHJlc3Nvcl9zdGVyZW86bGljZW5zZSI6ICJNSVQtc3R5bGUgU1RLLTQuMyBsaWNlbnNlIiB9LHsgImNvbXByZXNzb3JzLmxpYi9uYW1lIjogIkZhdXN0IENvbXByZXNzb3IgRWZmZWN0IExpYnJhcnkiIH0seyAiY29tcHJlc3NvcnMubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgImRlc2NyaXB0aW9uIjogIkNvbXByZXNzb3IgZGVtbyBhcHBsaWNhdGlvbiIgfSx7ICJmaWxlbmFtZSI6ICJ0bXAtNjA3Mjg1LXQ5cnFMajdwWVc4YSIgfSx7ICJtYXRocy5saWIvYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRocy5saWIvbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHMubGliL3ZlcnNpb24iOiAiMi4zIiB9LHsgIm5hbWUiOiAiY29tcHJlc3NvciIgfSx7ICJwbGF0Zm9ybS5saWIvbmFtZSI6ICJHZW5lcmljIFBsYXRmb3JtIExpYnJhcnkiIH0seyAicGxhdGZvcm0ubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgInJvdXRlcy5saWIvbmFtZSI6ICJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5IiB9LHsgInJvdXRlcy5saWIvdmVyc2lvbiI6ICIwLjIiIH0seyAic2lnbmFscy5saWIvbmFtZSI6ICJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5IiB9LHsgInNpZ25hbHMubGliL3ZlcnNpb24iOiAiMC4wIiB9LHsgInZlcnNpb24iOiAiMC4wIiB9XSwidWkiOiBbIHsidHlwZSI6ICJ2Z3JvdXAiLCJsYWJlbCI6ICJDT01QUkVTU09SIiwibWV0YSI6IFt7ICJ0b29sdGlwIjogIlJlZmVyZW5jZTogICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0R5bmFtaWNfcmFuZ2VfY29tcHJlc3Npb24iIH1dLCJpdGVtcyI6IFsgeyJ0eXBlIjogImhncm91cCIsImxhYmVsIjogIjB4MDAiLCJtZXRhIjogW3sgIjAiOiAiIiB9XSwiaXRlbXMiOiBbIHsidHlwZSI6ICJjaGVja2JveCIsImxhYmVsIjogIkJ5cGFzcyIsImFkZHJlc3MiOiAiL0NPTVBSRVNTT1IvMHgwMC9CeXBhc3MiLCJpbmRleCI6IDAsIm1ldGEiOiBbeyAiMCI6ICIiIH0seyAidG9vbHRpcCI6ICJXaGVuIHRoaXMgaXMgY2hlY2tlZCwgdGhlIGNvbXByZXNzb3IgICBoYXMgbm8gZWZmZWN0IiB9XX0seyJ0eXBlIjogImhiYXJncmFwaCIsImxhYmVsIjogIkNvbXByZXNzb3IgR2FpbiIsImFkZHJlc3MiOiAiL0NPTVBSRVNTT1IvMHgwMC9Db21wcmVzc29yX0dhaW4iLCJpbmRleCI6IDgwLCJtZXRhIjogW3sgIjEiOiAiIiB9LHsgInRvb2x0aXAiOiAiQ3VycmVudCBnYWluIG9mICB0aGUgY29tcHJlc3NvciBpbiBkQiIgfSx7ICJ1bml0IjogImRCIiB9XSwibWluIjogLTUwLCJtYXgiOiAxMH1dfSx7InR5cGUiOiAiaGdyb3VwIiwibGFiZWwiOiAiMHgwMCIsIm1ldGEiOiBbeyAiMSI6ICIiIH1dLCJpdGVtcyI6IFsgeyJ0eXBlIjogImhncm91cCIsImxhYmVsIjogIkNvbXByZXNzaW9uIENvbnRyb2wiLCJtZXRhIjogW3sgIjMiOiAiIiB9XSwiaXRlbXMiOiBbIHsidHlwZSI6ICJoc2xpZGVyIiwibGFiZWwiOiAiUmF0aW8iLCJhZGRyZXNzIjogIi9DT01QUkVTU09SLzB4MDAvQ29tcHJlc3Npb25fQ29udHJvbC9SYXRpbyIsImluZGV4IjogMjAsIm1ldGEiOiBbeyAiMCI6ICIiIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIkEgY29tcHJlc3Npb24gUmF0aW8gb2YgTiBtZWFucyB0aGF0IGZvciBlYWNoIE4gZEIgaW5jcmVhc2UgaW4gaW5wdXQgIHNpZ25hbCBsZXZlbCBhYm92ZSBUaHJlc2hvbGQsIHRoZSBvdXRwdXQgbGV2ZWwgZ29lcyB1cCAxIGRCIiB9XSwiaW5pdCI6IDUsIm1pbiI6IDEsIm1heCI6IDIwLCJzdGVwIjogMC4xfSx7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogIlRocmVzaG9sZCIsImFkZHJlc3MiOiAiL0NPTVBSRVNTT1IvMHgwMC9Db21wcmVzc2lvbl9Db250cm9sL1RocmVzaG9sZCIsImluZGV4IjogNDQsIm1ldGEiOiBbeyAiMSI6ICIiIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIldoZW4gdGhlIHNpZ25hbCBsZXZlbCBleGNlZWRzIHRoZSBUaHJlc2hvbGQgKGluIGRCKSwgaXRzIGxldmVsICBpcyBjb21wcmVzc2VkIGFjY29yZGluZyB0byB0aGUgUmF0aW8iIH0seyAidW5pdCI6ICJkQiIgfV0sImluaXQiOiAtMzAsIm1pbiI6IC0xMDAsIm1heCI6IDEwLCJzdGVwIjogMC4xfV19LHsidHlwZSI6ICJoZ3JvdXAiLCJsYWJlbCI6ICJDb21wcmVzc2lvbiBSZXNwb25zZSIsIm1ldGEiOiBbeyAiNCI6ICIiIH1dLCJpdGVtcyI6IFsgeyJ0eXBlIjogImhzbGlkZXIiLCJsYWJlbCI6ICJBdHRhY2siLCJhZGRyZXNzIjogIi9DT01QUkVTU09SLzB4MDAvQ29tcHJlc3Npb25fUmVzcG9uc2UvQXR0YWNrIiwiaW5kZXgiOiAxNiwibWV0YSI6IFt7ICIxIjogIiIgfSx7ICJzY2FsZSI6ICJsb2ciIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIlRpbWUgY29uc3RhbnQgaW4gbXMgKDEvZSBzbW9vdGhpbmcgdGltZSkgZm9yIHRoZSBjb21wcmVzc2lvbiBnYWluICB0byBhcHByb2FjaCAoZXhwb25lbnRpYWxseSkgYSBuZXcgbG93ZXIgdGFyZ2V0IGxldmVsICh0aGUgY29tcHJlc3Npb24gIGBraWNraW5nIGluJykiIH0seyAidW5pdCI6ICJtcyIgfV0sImluaXQiOiA1MCwibWluIjogMSwibWF4IjogMTAwMCwic3RlcCI6IDAuMX0seyJ0eXBlIjogImhzbGlkZXIiLCJsYWJlbCI6ICJSZWxlYXNlIiwiYWRkcmVzcyI6ICIvQ09NUFJFU1NPUi8weDAwL0NvbXByZXNzaW9uX1Jlc3BvbnNlL1JlbGVhc2UiLCJpbmRleCI6IDI0LCJtZXRhIjogW3sgIjIiOiAiIiB9LHsgInNjYWxlIjogImxvZyIgfSx7ICJzdHlsZSI6ICJrbm9iIiB9LHsgInRvb2x0aXAiOiAiVGltZSBjb25zdGFudCBpbiBtcyAoMS9lIHNtb290aGluZyB0aW1lKSBmb3IgdGhlIGNvbXByZXNzaW9uIGdhaW4gIHRvIGFwcHJvYWNoIChleHBvbmVudGlhbGx5KSBhIG5ldyBoaWdoZXIgdGFyZ2V0IGxldmVsICh0aGUgY29tcHJlc3Npb24gICdyZWxlYXNpbmcnKSIgfSx7ICJ1bml0IjogIm1zIiB9XSwiaW5pdCI6IDUwMCwibWluIjogMSwibWF4IjogMTAwMCwic3RlcCI6IDAuMX1dfV19LHsidHlwZSI6ICJoc2xpZGVyIiwibGFiZWwiOiAiTWFrZXVwIEdhaW4iLCJhZGRyZXNzIjogIi9DT01QUkVTU09SL01ha2V1cF9HYWluIiwiaW5kZXgiOiA0LCJtZXRhIjogW3sgIjUiOiAiIiB9LHsgInRvb2x0aXAiOiAiVGhlIGNvbXByZXNzZWQtc2lnbmFsIG91dHB1dCBsZXZlbCBpcyBpbmNyZWFzZWQgYnkgdGhpcyBhbW91bnQgIChpbiBkQikgdG8gbWFrZSB1cCBmb3IgdGhlIGxldmVsIGxvc3QgZHVlIHRvIGNvbXByZXNzaW9uIiB9LHsgInVuaXQiOiAiZEIiIH1dLCJpbml0IjogNDAsIm1pbiI6IC05NiwibWF4IjogOTYsInN0ZXAiOiAwLjF9XX1dfQ=="; }

/*
 faust2wasm: GRAME 2017-2019
*/
 
'use strict';

// Monophonic Faust DSP
class tmp-607285-t9rqLj7pYW8aProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            tmp-607285-t9rqLj7pYW8aProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            tmp-607285-t9rqLj7pYW8aProcessor.parse_items(group.items, obj, callback);
        }
    }
    
    static parse_items(items, obj, callback)
    {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], obj, callback);
        }
    }
    
    static parse_item1(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            tmp-607285-t9rqLj7pYW8aProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Nothing
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            obj.push({ name: item.address,
                     defaultValue: item.init,
                     minValue: item.min,
                     maxValue: item.max });
        }
    }
    
    static parse_item2(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            tmp-607285-t9rqLj7pYW8aProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "soundfile") {
            // Keep soundfile adresses
            obj.soundfile_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        }
    }
 
    static get parameterDescriptors() 
    {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        tmp-607285-t9rqLj7pYW8aProcessor.parse_ui(JSON.parse(getJSONtmp-607285-t9rqLj7pYW8a()).ui, params, tmp-607285-t9rqLj7pYW8aProcessor.parse_item1);
 	    return params;
    }
   
    constructor(options)
    {
        super(options);
        this.running = true;
        
       	const importObject = {
                env: {
                    memoryBase: 0,
                    tableBase: 0,

                    // Integer version
                    _abs: Math.abs,

                    // Float version
                    _acosf: Math.acos,
                    _asinf: Math.asin,
                    _atanf: Math.atan,
                    _atan2f: Math.atan2,
                    _ceilf: Math.ceil,
                    _cosf: Math.cos,
                    _expf: Math.exp,
                    _floorf: Math.floor,
                    _fmodf: function(x, y) { return x % y; },
                    _logf: Math.log,
                    _log10f: Math.log10,
                    _max_f: Math.max,
                    _min_f: Math.min,
                    _remainderf: function(x, y) { return x - Math.round(x/y) * y; },
                    _powf: Math.pow,
                    _roundf: Math.fround,
                    _sinf: Math.sin,
                    _sqrtf: Math.sqrt,
                    _tanf: Math.tan,
                    _acoshf: Math.acosh,
                    _asinhf: Math.asinh,
                    _atanhf: Math.atanh,
                    _coshf: Math.cosh,
                    _sinhf: Math.sinh,
                    _tanhf: Math.tanh,

                    // Double version
                    _acos: Math.acos,
                    _asin: Math.asin,
                    _atan: Math.atan,
                    _atan2: Math.atan2,
                    _ceil: Math.ceil,
                    _cos: Math.cos,
                    _exp: Math.exp,
                    _floor: Math.floor,
                    _fmod: function(x, y) { return x % y; },
                    _log: Math.log,
                    _log10: Math.log10,
                    _max_: Math.max,
                    _min_: Math.min,
                    _remainder:function(x, y) { return x - Math.round(x/y) * y; },
                    _pow: Math.pow,
                    _round: Math.fround,
                    _sin: Math.sin,
                    _sqrt: Math.sqrt,
                    _tan: Math.tan,
                    _acosh: Math.acosh,
                    _asinh: Math.asinh,
                    _atanh: Math.atanh,
                    _cosh: Math.cosh,
                    _sinh: Math.sinh,
                    _tanh: Math.tanh,

                    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
                }
        };
        
        this.tmp-607285-t9rqLj7pYW8a_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
        this.json_object = JSON.parse(options.processorOptions.json);
     
        this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
        
        this.ins = null;
        this.outs = null;

        this.dspInChannnels = [];
        this.dspOutChannnels = [];

        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);

        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
        this.integer_size = 4;
        
        this.factory = this.tmp-607285-t9rqLj7pYW8a_instance.exports;
        this.HEAP = this.tmp-607285-t9rqLj7pYW8a_instance.exports.memory.buffer;
        this.HEAP32 = new Int32Array(this.HEAP);
        this.HEAPF32 = new Float32Array(this.HEAP);

        // Warning: keeps a ref on HEAP in Chrome and prevent proper GC
        //console.log(this.HEAP);
        //console.log(this.HEAP32);
        //console.log(this.HEAPF32);

        // bargraph
        this.outputs_timer = 5;
        this.outputs_items = [];

        // input items
        this.inputs_items = [];
        
        // soundfile items
        this.soundfile_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        this.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * NUM_FRAMES * this.sample_size);
        
        // Start of DSP memory : DSP is placed first with index 0
        this.dsp = 0;

        this.pathTable = [];
     
        // Send output values to the AudioNode
        this.update_outputs = function ()
        {
            if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                this.outputs_timer = 5;
                for (var i = 0; i < this.outputs_items.length; i++) {
                    this.output_handler(this.outputs_items[i], this.HEAPF32[this.pathTable[this.outputs_items[i]] >> 2]);
                }
            }
        }
        
        this.initAux = function ()
        {
            var i;
            
            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((NUM_FRAMES * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((NUM_FRAMES * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            tmp-607285-t9rqLj7pYW8aProcessor.parse_ui(this.json_object.ui, this, tmp-607285-t9rqLj7pYW8aProcessor.parse_item2);
                 
            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.setParamValue = function (path, val)
        {
            this.HEAPF32[this.pathTable[path] >> 2] = val;
        }

        this.getParamValue = function (path)
        {
            return this.HEAPF32[this.pathTable[path] >> 2];
        }

        // Init resulting DSP
        this.initAux();
        console.log(this);
    }
    
    handleMessage(event)
    {
        var msg = event.data;
        switch (msg.type) {
            case "destroy": this.running = false; break;
        }
    }
    
    process(inputs, outputs, parameters) 
    {
        var input = inputs[0];
        var output = outputs[0];
        
        // Check inputs
        if (this.numIn > 0 && (!input || !input[0] || input[0].length === 0)) {
            //console.log("Process input error");
            return true;
        }
        // Check outputs
        if (this.numOut > 0 && (!output || !output[0] || output[0].length === 0)) {
            //console.log("Process output error");
            return true;
        }
        
        // Copy inputs
        if (input !== undefined) {
            for (var chan = 0; chan < Math.min(this.numIn, input.length); ++chan) {
                var dspInput = this.dspInChannnels[chan];
                dspInput.set(input[chan]);
            }
        }
        
        /*
        TODO: sample accurate control change is not yet handled
        When no automation occurs, params[i][1] has a length of 1,
        otherwise params[i][1] has a length of NUM_FRAMES with possible control change each sample
    	*/
        
        // Update controls
        for (const path in parameters) {
            const paramArray = parameters[path];
            this.setParamValue(path, paramArray[0]);
        }
        
        // Compute
        try {
            this.factory.compute(this.dsp, NUM_FRAMES, this.ins, this.outs);
        } catch(e) {
            console.log("ERROR in compute (" + e + ")");
        }
        
        // Update bargraph
        this.update_outputs();
        
        // Copy outputs
        if (output !== undefined) {
            for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                var dspOutput = this.dspOutChannnels[chan];
                output[chan].set(dspOutput);
            }
        }
        
        return this.running;
    }
}

// Globals
const NUM_FRAMES = 128;
try {
    registerProcessor('tmp-607285-t9rqLj7pYW8a', tmp-607285-t9rqLj7pYW8aProcessor);
} catch (error) {
    console.warn(error);
}
