var vows=require('vows');
var assert=require('assert');
var rdf=require('rdf');

vows.describe('String builtins').addBatch(
{ "String.resolve rdf:type":
	{ topic: "rdf:type".resolve()
	, "Equals input": function(t){ assert.strictEqual(t, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"); }
	}
, "String.resolve rdfs:Class":
	{ topic: "rdfs:Class".resolve()
	, "Equals input": function(t){ assert.strictEqual(t, "http://www.w3.org/2000/01/rdf-schema#Class"); }
	, "is String": function(t){ assert.isString(t); }
	}
, "String.resolve unknown CURIE":
	{ topic: "unknownprefixfoo2:bar".resolve()
	, "strictEquals input": function(t){ assert.strictEqual(t, "unknownprefixfoo2:bar"); }
	, "Equals input": function(t){ assert.equal(t, "unknownprefixfoo2:bar"); }
	, "Typeof string": function(t){ assert.typeOf(t, "string"); }
	, ".equals()": function(t){ assert.isTrue("unknownprefixfoo2:bar".equals(t)); }
	, "Add CURIE mapping":
		{ topic: function(){ rdf.context.setMapping("unknownprefixfoo2", "http://example.com/2/ex/42/"); return rdf.context; }
		, "Check CURIE":
			{ topic: function(context){ return context.resolveCurie("unknownprefixfoo2:answer"); }
			, "Equals <http://example.com/2/ex/42/answer>": function(t){ assert.strictEqual(t.value, "http://example.com/2/ex/42/answer"); }
			, "<http://example.com/2/ex/42/answer>.equals": function(t){ assert.isTrue("http://example.com/2/ex/42/answer".equals(t)); }
			}
		}
	}
, "String.resolve() resolved URI":
	{ topic: "http://slashdot.org/".resolve()
	, "strictEqual": function(t){ assert.strictEqual(t, 'http://slashdot.org/'); }
	, "equals": function(t){ assert.equal(t, 'http://slashdot.org/'); }
	}
, "String.resolve() bnode syntax":
	{ topic: "_:someBlankNode".resolve()
	, "strictEqual": function(t){ assert.strictEqual(t, '_:someBlankNode'); }
	, "equals": function(t){ assert.equal(t, '_:someBlankNode'); }
	}
, "String.n3() <http://slashdot.org/>":
	{ topic: "http://slashdot.org/".n3()
	, "equals": function(t){ assert.strictEqual(t, '<http://slashdot.org/>'); }
	}
, 'String.l().n3() "PLAINLITERAL"':
	{ topic: "0xDEADBEEFCAFE".l().n3()
	, "equals": function(t){ assert.strictEqual(t, '"PLAINLITERAL"'); }
	}
, 'String.l(en).n3() "English"@en':
	{ topic: "English".l("en").n3()
	, "equals": function(t){ assert.strictEqual(t, '"English"@en'); }
	}
, 'String.tl(xsd:string).n3() "XSD String"^^<http://www.w3.org/2001/XMLSchema#string>':
	{ topic: "XSD String".tl("xsd:string").n3()
	, "equals": function(t){ assert.strictEqual(t.value, '"XSD String"^^<http://www.w3.org/2001/XMLSchema#string>'); }
	}
}).export(module);
