import { myData } from "../../JSON/obj.js";
function checkEmpNameInp(){
    let empNameInp = document.getElementById('empNameInp').value;
    if(empNameInp != null || empNameInp != undefined || empNameInp != ''){
        return empNameInp;
    }
}
function checkEmpSalaryInp(){
    let empSalaryInp = document.getElementById('empSalaryInp').value;
    if(empSalaryInp != null || empSalaryInp != undefined || empSalaryInp != ''){
        return empSalaryInp;
    }
}
function checkEmpCityInp(){
    let empCityInp = document.getElementById('empCityInp').value;
    if(empCityInp != null || empCityInp != undefined || empCityInp != ''){
        return empCityInp;
    }
}
function checkEmpMobileInp(){
    let empMobileInp = document.getElementById('empMobileInp').value;
    if(empMobileInp != null || empMobileInp != undefined || empMobileInp != ''){
        return empMobileInp;
    }
}
function checkEmpTypeInp(){
    let empTypeInp = document.getElementById('empTypeInp').value;
    if(empTypeInp != null || empTypeInp != undefined || empTypeInp != ''){
        return empTypeInp;
    }
}
function displayEmpInp(){
    let prevNamelbl = document.getElementById('prevempNamelbl');
    prevNamelbl.style.display = "none";
    let prevNameInp = document.getElementById('prevempNameInp');
    prevNameInp.style.display = "none";
    let heading = document.getElementById('heading');
    heading.style.display = "none";
    let empInpDiv = document.getElementById('empInput');
    empInpDiv.style.display = "block";
    let empSalarylbl = document.getElementById('empSalarylbl');
    empSalarylbl.style.display = "block";
    let empCitylbl = document.getElementById('empCitylbl');
    empCitylbl.style.display = "block";
    let empMobilelbl = document.getElementById('empMobilelbl');
    empMobilelbl.style.display = "block";
    let empTypelbl = document.getElementById('empTypelbl');
    empTypelbl.style.display = "block";
    let empSalaryInp = document.getElementById('empSalaryInp');
    empSalaryInp.style.display = "block";
    let empCityInp = document.getElementById('empCityInp');
    empCityInp.style.display = "block";
    let empMobileInp = document.getElementById('empMobileInp');
    empMobileInp.style.display = "block";
    let empTypeInp = document.getElementById('empTypeInp');
    empTypeInp.style.display = "block";
}
function clearEmpInp(){
    let empNameInp = document.getElementById('empNameInp');
    empNameInp.value = '';
    let empSalaryInp = document.getElementById('empSalaryInp');
    empSalaryInp.value = '';
    let empCityInp = document.getElementById('empCityInp');
    empCityInp.value = '';
    let empMobileInp = document.getElementById('empMobileInp');
    empMobileInp.value = '';
    let empTypeInp = document.getElementById('empTypeInp');
    empTypeInp.value = '';
    let prevNameInp = document.getElementById('prevempNameInp');
    prevNameInp.value = '';
}
function addtoJSON(obj){
    let citySelect = document.getElementById('citySelect').value;
    let houseSelect = document.getElementById('houseSelect').value;
    let depSelect = document.getElementById('depSelect').value;
    myData.cities.forEach(city =>{
        if(city.name == citySelect){
            let softwareHouses = city.softwareHouses;
            softwareHouses.forEach(house =>{
                if(house.name == houseSelect){
                    let departments = house.departments;
                    departments.forEach(department => {
                        if(department.name == depSelect){
                            let employees = department.employees;
                            employees.push(obj);
                        }
                    })
                }
            })
        }
    })
}
export{displayEmpInp, checkEmpNameInp, checkEmpSalaryInp, checkEmpCityInp,checkEmpMobileInp, checkEmpTypeInp, clearEmpInp, addtoJSON};