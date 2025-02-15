import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        let lower=word;
        return lower.charAt(0).toUpperCase() + lower.slice(1);

        
    };
    return (
        <>
            <div style={{height: '50px'}}>
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{capitalize('success : ')}</strong> {props.msg}
                
            </div></div>
        </>
    )
}

export default Alert
