import React from 'react'

export default function Loader( { show = false } ) {
    return show ? <h3>Loading...</h3> : null
}