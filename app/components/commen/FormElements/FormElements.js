//-----------------------------------------------------------------------------------------//
//                             Reusable form element components                            //
//-----------------------------------------------------------------------------------------//
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Styles from './formElements.module.scss';
const Label = ({ answer }) => (
  <div style={{ marginBottom: "5px", marginTop: "5px" }}>
    <strong>{answer}</strong>
  </div>
);

const TextBox = ({ id, name, value, onChange, placeholder, className ,readonly}) => {
  console.log("red",readonly);
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      placeholder={placeholder || ""}
      onChange={onChange}
      className={className || ""}
      readOnly={readonly || false}
    />
  );
};

const TextArea = ({ id, name, value, onChange, width, className }) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    style={{ width }}
    className={className || ""}
  />
);

const ListBox = ({ name, options, value, onChange }) => (
  <select name={name} value={value} onChange={onChange}>
    <option value="">Select</option>
    {options?.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ))}
  </select>
);

const RadioButton = ({ id, name, value, onChange }) => (
    <div>
      <input type="radio" id={id} name={name} value={value} onChange={onChange} />
      <label htmlFor={id} className="cr-lbl" style={{ marginRight: "10px", fontFamily: "verdana" }}>{value}</label>
    </div>
);
  
const Checkbox = ({ id,label, name, checked, onChange }) => (
        <div className={Styles.flex}>
            <label htmlFor={id} className={Styles.checklabel}>{label}
            <input 
                id={id} 
                name={name} 
                type="checkbox"  
                checked={checked} 
                onChange={(e) => onChange(name, e.target.checked)}
            />
               <span className={Styles.checkmark}></span>
            </label>
       </div>
);

const Password = ({ id, name, maxLength, width }) => (
    <input id={id} name={name} type="password" maxLength={maxLength} style={{ width }} />
);


const Calendar = ({ selectedDate, onChange }) => (
  <DatePicker selected={selectedDate} onChange={onChange} />
);
  
module.exports = { 
    Label, 
    TextBox, 
    RadioButton, 
    Checkbox,
    Password,
    TextArea,
    ListBox
 };