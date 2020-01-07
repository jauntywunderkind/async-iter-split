"use module"

export function makeAsyncIterSplit( opts){
	async function *AsyncIterSplit( incoming, opts){
		let
			buffer, // undefined signals that immediate send is ready
			encoding= incoming.encoding|| (incoming._readable&& incoming._readable.encoding)|| "utf8"
		for await( let i of incoming){
			// down-convert buffers to text
			i= i.toString( encoding)
	
			// if we have data, join it up to incoming
			if( buffer!== undefined){
				i= buffer+ i
			}

			// find lines
			const lines= i.split( AsyncIterSplit.split)
			// walk & yield all but last
			for( let walk= 0; walk< lines.length- 1; ++walk){
				yield lines[ walk]
			}

			const lastLine= lines[ lines.length -1]
			if( lastLine=== ''){
				buffer= undefined
			}else{
				buffer= lastLine
			}
		}
		if( buffer!== undefined){
			yield buffer
		}
	}
	// see: http://www.unicode.org/reports/tr18/#Line_Boundaries
	AsyncIterSplit.split= opts&& opts.split|| /\r\n|[\n\v\f\r\x85\u2028\u2029]/g
	return AsyncIterSplit
}

const _singleton= makeAsyncIterSplit()
export {
	_singleton as default,
	_singleton as AsyncIterSplit,
	_singleton as singleton,
	_singleton as Split,
	_singleton as split
}
