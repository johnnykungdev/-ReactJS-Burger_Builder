import React from 'react';

import classes from './input.module.scss';

const input = (props) => {
    let InputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    
    switch(props.elementType){
        case ('input'):
            InputElement = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>;
            break;
        case ('textarea'):
            InputElement = <textarea 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}/>;
            break;
        case ('select'):
            InputElement = 
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            InputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
        
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
        </div>  
    )
};

export default input;