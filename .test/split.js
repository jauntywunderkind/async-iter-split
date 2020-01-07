#!/usr/bin/env node
import tape from "tape"
import Split from "../split.js"

tape( "split", async function( t){
	const
		fixture= [ "hello\nto"," you\n\n", "how ", "are ya?"],
		expected= [ "hello", "to you", "", "how are ya?"],
		split= Split( fixture)
	t.plan( expected.length+ 1)
	let n= 0
	for await( const line of split){
		t.equal( line, expected[ n])
		++n
	}
	t.equal( n, expected.length)
	t.end()
})

