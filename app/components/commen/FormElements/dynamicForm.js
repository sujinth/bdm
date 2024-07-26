'use client'
import React from 'react';
import Styles from '../../../(dashboard)/visit-reports/visitreport.module.scss';
import { Label, TextBox, TextArea, Checkbox } from './FormElements';

const DynamicForm = ({ formDetails, handleFormChange ,formValues}) => {

  const handleChange = (id, value) => {
    handleFormChange(id, value);
  };

  const sortedFormDetails = formDetails?.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {sortedFormDetails?.map((item, index) => {
        const counter = index + 1;
        const controlId = item.formControlId;
        const formFieldId = item.formFieldId
        const sortOrder = item.sortOrder;
        let value =  '';
        let checked = false;
        switch (controlId) {
          case "1":
            return (
              <TextBox
                key={index}
                id={formFieldId}
                name={controlId}
                maxLength={100}
                width="50%"
                value={value}
                onChange={(e) => handleChange(controlId, e.target.value)}
              />
            );
          case "2":
             value = formValues?.[`ta${sortOrder}`] || '';
            return (
              <React.Fragment key={index}>
                <Label key={index} answer={item.question} />
                <TextArea
                  key={index}
                  id={`ta${counter}`}
                  width="50%"
                  name={`ta${counter}`}
                  value={value}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          case "3":
            checked = formValues?.[`chk${counter}`] || false;
            return(
              <Checkbox
                id={formFieldId}
                name={`chk${counter}`}
                label="Review pending business MTA & Score"
                checked={checked}
                onChange={handleChange}
              />

            )
          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicForm;
