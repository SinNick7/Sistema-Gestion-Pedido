import {
    rgxEmail,
    rgxDni,
    rgxOnlyNumbers,
    rgxOnlyLetters,
    rgxLettersSpace,
    rgxLettersSpaceBetween,
    rgxAlphanumeric,
    rgxLettersNames,
  } from "@/utils/patternsRegex";
  
  /**
   * @param {*} field
   */
  const ruleNotNull = (field) => (value) => {
    return (
      Object.keys(value ? value : !!value).length > 0 ||
      `Debe seleccionar una ${field}`
    );
  };
  
  /**
   * @param {*} field Campo
   */
  const ruleRequired = (field) => (value) => {
    return (
      (String(value) || "").trim().length > 0 ||
      `El campo ${field} es obligatorio`
    );
  };
  
  /**
   * @param {*} anyo Campo
   */
  const ruleMaxCurrentYear = (anyo) => {
    if (!anyo) return true;
    let fullYear = (new Date()).getFullYear()
    return anyo <= fullYear || `El año no debe ser mayor al actual`;
  };
  
  /**
   * Validación de Campo Ligero
   * @param {*} field
   */
  const ruleRequiredLight = (field) => (value) => {
    return !!value || `El campo ${field} es obligatorio`;
  };
  
  /**
   * Validación de Campo fuerte, uso el metodo nativo Strim() para eliminar espacios inncesarios (comunmente espacios colaterales del valor)
   * Ejm.I     name     I => name
   * @param {*} field Campo
   */
  const ruleRequiredHard = (field) => (value) => {
    return (value && !!value.trim()) || `El campo ${field} es obligatorio`;
  };
  
  /**
   * Regla de Validación para Correos Electrónicos
   * */
  const ruleEmail = (value) => {
    if (!value) return true;
    return rgxEmail.test(value) || "Formato de correo electrónico inválido";
  };
  
  // Regla para validar nro de DNI
  const ruleDni = (value) => {
    if (!value) return true;
    return rgxDni.test(value) || "Número de DNI inválido";
  };
  
  const ruleTelefono = (value) => {
    if (!value) return true;
    return /^(?!(000\d+)$)(\d)(?!\2+$)\d{8}$/g.test(value) || "Formato de Telefóno inválido";
  };
  
  const ruleOnlyAlphanumeric = (value) => {
    if (!value) return true;
    return rgxAlphanumeric.test(value) || "Campo debe ser solo alfanumérico";
  };
  
  /**
   * Validación de tamaño de caracteres
   * @param {*} length : cantidad de caracteres permitidos
   */
  const ruleMaxLengthChars = (length) => (value) => {
    if (!value) return true;
  
    return value.length <= length || `Máximo ${length} caracteres`;
  };
  
  const ruleMinLengthChars = (length) => (value) => {
    if (!value) return true;
  
    return value.length >= length || `Mínimo ${length} caracteres`;
  };
  
  const maxNumber = (max) => (value) => {
    return (value && value <= max) || `Campo debe ser menor o igual a ${max}`;
  };
  
  const ruleOnlyNumbers = (value) => {
    if (!value) return true;
    return (
      rgxOnlyNumbers.test(value) || "Campo debe ser solo numérico sin espacio"
    );
  };
  
  const ruleOnlyLetters = (value) => {
    if (!value) return true;
    return (
      rgxOnlyLetters.test(value) || "Campo debe ser solo alfabético sin espacio"
    );
  };
  
  const ruleOnlyLettersSpace = (value) => {
    if (!value) return true;
    return rgxLettersSpace.test(value.trim()) || "Campo debe ser solo alfabético";
  };
  
  const ruleOnlyLettersSpaceBetween = (value) => {
    if (!value) return true;
    return (
      rgxLettersSpaceBetween.test(value.trim()) ||
      "Campo debe ser solo alfabético"
    );
  };
  
  const rulePeopleNames = (value) => {
    if (!value) return true;
    return rgxLettersNames.test(value.trim()) || "Campo debe ser solo alfabético";
  };
  // const onlyNumbers= (v) =>i
  // rgxOnlyNumbers.test(v) || "Campo debe ser solo numerico sin espacio"i,
  
  export const rules = {
    notNull: ruleNotNull,
    required: ruleRequired,
    ruleMaxCurrentYear: ruleMaxCurrentYear,
    requiredLight: ruleRequiredLight,
    requiredHard: ruleRequiredHard,
    email: ruleEmail,
    telefono: ruleTelefono,
    maxLengthChars: ruleMaxLengthChars,
    minLengthChars: ruleMinLengthChars,
    dni: ruleDni,
    onlyNumbers: ruleOnlyNumbers,
    maxNumber,
    onlyLetters: ruleOnlyLetters,
    onlyLettersSpace: ruleOnlyLettersSpace,
    onlyLettersSpaceBetween: ruleOnlyLettersSpaceBetween,
    onlyAlphanumeric: ruleOnlyAlphanumeric,
    onlyValidNames: rulePeopleNames,
  };
  