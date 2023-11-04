import React from 'react'




export const Input = React.memo(({ type, title, name, accept="*/*", value, onChange, classNames }) => {

    if (!classNames) classNames = ""
    if (!type) type = ""

    let inputToRender;
    switch (type) {
        case "file": inputToRender = <FileInput name={name} onChange={onChange} accept={accept} classNames={classNames} />
            break;
        case "textarea": inputToRender = <TextArea name={name} value={value} onChange={onChange} title={title} classNames={classNames} />
            break;
        default: inputToRender = <DefaultInput type={type} name={name} value={value} onChange={onChange} title={title} classNames={classNames} />
            break;
    }

    return (
        <div className="form-control w-full mt-4">
            <label className="label capitalize">
                <span className="label-text">{title}</span>
            </label>
            {inputToRender}
        </div>
    )
}
)


const FileInput = ({name, classNames, accept, value, onChange}) => {
    return (
        <input
            type="file"
            onChange={onChange}
            value={value}
            name={name}
            accept={accept}
            className={"file-input file-input-bordered file-input-primary w-full " + classNames}
        />
    )
}


const TextArea = ({name, title, classNames, value, onChange}) => {
    return (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={"textarea textarea-primary " + classNames}
            placeholder={`Enter ${title}`}
            required
        >
        </textarea>
    )
}

const DefaultInput = ({type, name, title, onChange, value, classNames}) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={`Enter ${title}`}
            className={"input input-primary w-full capitalize " + classNames}
            required
        />
    )
}