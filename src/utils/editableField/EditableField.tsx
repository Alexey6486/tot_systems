import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './EditableSpan.module.css';
import editImg from '../../assets/images/edit.png';

type PropsType = {
    title: string
    editTask: (inputValue: string) => void
    checkUser: boolean
}

export const EditableField = React.memo((props: PropsType) => {

    const {title, editTask, checkUser} = props;

    const [value, setValue] = useState<string>(title);
    const [edit, setEdit] = useState<boolean>(false);
    let [err, setErr] = useState("");

    const activateEditModeClick = () => {
        setEdit(true);
    };
    const applyEditionOnBlur = () => {
        if (value.trim()) {
            setEdit(false);
            editTask(value);
        } else { setErr("err"); }
    };
    const applyEditionByEnterKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.charCode === 13) {
            applyEditionOnBlur();
        }
    };
    const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setErr("");
        setValue(e.currentTarget.value)
    };

    const editCondition = edit
                            ? <textarea value={value}
                                     onBlur={applyEditionOnBlur}
                                     autoFocus={true}
                                     onChange={inputOnChange}
                                     onKeyPress={applyEditionByEnterKey}/>

                            : <div className={s.messageText}>{title}</div>;

    const errCondition = err && <div className={s.errMsg}>Text something...</div>;

    return (
        <div className={s.editableSpanWrap}>
            <div>
                {editCondition}
                {errCondition}
            </div>
            {
                checkUser &&
                <button className={s.editMessage} onClick={activateEditModeClick}>
                    <img src={editImg} alt=""/>
                </button>}
        </div>
    );
});
