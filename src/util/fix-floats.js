export default function fixFloats( num ) {
    num = +num // prevent strings
    if ( typeof num !== 'number' || isNaN( num ) ) return num
    return +( num.toFixed( 2 ) )
}