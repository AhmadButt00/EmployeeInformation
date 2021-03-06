import { myData } from "./JSON/obj.js"; //Main Object (JSON) Import
import {populateDataTable} from './Functions/PopulateDataTable.js' //Display All Employees DataTable
import {populateCityTable} from './Functions/PopulateCityTable.js'//Display City Wise Employee DataTable
import {displayHouseDrp} from './Functions/DisplayHouseDrp.js'; //Display SoftwareHouse Select + Table
import {houseDataTable} from './Functions/HouseDataTable.js'; //Display SoftwareHouse Wise Employee DataTable
import {displayDepDrop} from './Functions/DisplayDepDrop.js'; //Display Department Select + Table
import {empDataTable} from './Functions/EmpDataTable.js'; //Display Department Wise Employee DataTable
// City CRUD Operation Imports
import {add, checkInput, addOption,addRow,clearInp} from './CRUD/City/AddCity.js';
import {upCity ,displayUpdateInp,checkUpInput,updateOption, updateRow} from './CRUD/City/UpdateCity.js';
import {delOption,delRow, delObject} from './CRUD/City/DelCity.js';
import {displayBtn} from './CRUD/City/DisplayCityBtn.js';
// Software House CRUD Operation Imports
import{displayHouseBtn} from './CRUD/House/DisplayHousebtn.js';
import {addHouse,checkNameInput,checkLocationInput, checkTypeInput, addHouseRow, addHouseOption, clearHouseInp, addHouseObject} from './CRUD/House/AddHouse.js';
import {delDisplayHouse, delHouseOption, delHouseRow, delHouseObject} from './CRUD/House/DelHouse.js';
import {displayUpdateHouse, updateHouseOption, checknewNameInput,
   checknewLocationInput, checknewTypeInput, clearnewHouseInp, updateHouseRow, updateHouseObject} from './CRUD/House/UpdateHouse.js';
//Departments CRUD Imports
import {displayDepbtn} from './CRUD/Departments/DisplayDepbtn.js';
import {addDep, checkDepInput, addDepOption,addDepRow,clearDepInp}from './CRUD/Departments/AddDep.js';
import {delDepOption, delDepRow,delDepObject} from './CRUD/Departments/DelDep.js';
import {displayDepUpdateInp, checkUpDepInput, updateDepOption, updateDepRow, upDep} from './CRUD/Departments/UpdateDep.js';

// Employee CRUD Imports
import {displayEmpbtn} from './CRUD/Employee/DisplayEmployeebtn.js';
import {displayEmpInp, checkEmpNameInp, checkEmpSalaryInp, checkEmpCityInp,checkEmpMobileInp, checkEmpTypeInp,
   clearEmpInp, addtoJSON} from './CRUD/Employee/AddEmployee.js';
import {displayUpEmpInp, checkUpEmpInput, updateEmpRow, upEmp} from './CRUD/Employee/UpdateEmployee.js';
import {displayDelInp, delEmpRow, delfromJSON} from './CRUD/Employee/DeleteEmployee.js';

// LiveSearch Import
import {liveSearchInp, disableBtn} from './LiveSearch/liveSearch.js';

let data = Object.assign({},myData)  //Cloning main Object
let depOption = document.querySelectorAll('.depOption'); //department select options
let depDropDiv = document.getElementById('depDropdown'); //department select + table div
const depCheck = document.querySelectorAll('#depTable tbody tr'); //department table body

// initializing array for employee data
let cityObj = data.cities; //Main Object City Data
let empArr = []; //employee Array Initialization

// On Load Hide Table Div
window.onload = function() {
  document.getElementById('tableDiv').style.display = 'none';
};

// Get All Employees Data
for(let i=0; i<cityObj.length; i++){
  let  obj = cityObj[i];
  let softwareHouses = obj.softwareHouses;
  for(let j = 0;j <softwareHouses.length; j++){
    let departments = softwareHouses[j].departments;
    for (let k =0; k<departments.length; k++){
      let employees = departments[k].employees;
      employees.forEach(element => {
        empArr.push(element);
      })
    }
  }
}

// Initial datatable display call
populateDataTable(empArr,'dt');

// Initializing datatable
var dataTable = new DataTable("#dt");
function cityEmpDt(){
    var cityEmpArr = houseDataTable();
    cityEmpArr.forEach(element =>{
        let dataArr = Object.values(element)
        dataTable.rows().add(dataArr);
      })
}

// Citydropdown onChange()
function changeCitySelect(){
    let liveSearchbtn = document.getElementById('toggleDt');
    liveSearchbtn.style.display = "none";
    let switchDt = document.getElementById('switchDt');
    switchDt.style.display = "none";
    displayBtn();
    displayHouseBtn();
    const check = document.querySelector('#cityTable tbody tr') //Get City Table Rows
    const houseCheck = document.querySelectorAll('#houseTable tbody tr'); //Get SoftwareHouse Table Rows
    if(check == null || check == undefined){
      populateCityTable(); //Display City DataTable
    }
    if(houseCheck == null || check == undefined){
      displayHouseDrp(); //Display SoftwareHouse Select Options + Table
    }
    else {
      houseCheck.forEach(element =>{
        element.parentNode.removeChild(element)
      })
      let houseOption = document.querySelectorAll('.houseOption'); //Get all SoftwareHouse Select Options
      houseOption.forEach(element =>{
        element.parentNode.removeChild(element);
      })
      displayHouseDrp(); //Display SoftwareHouse Select Options + Table
    }
    
    depDropDiv.style.display = "none"; //Hide Department Select + Table Div
    
    if(depCheck == null || depCheck == undefined){
    }
    else {
      depCheck.forEach(element =>{
        element.parentNode.removeChild(element)
      })
      
      depOption.forEach(element =>{
        element.parentNode.removeChild(element);
      })
    }
    removedtRows(); //Remove Exisiting DataTable Rows
    cityEmpDt(); //Display City Wise Employees DataTable
}

//Adding City Select OnChange Attribute
const citySe = document.getElementById('citySelect');
citySe.addEventListener("change", changeCitySelect);

//Remove Exisiting DataTable Rows Function
function removedtRows(){
    var rowToRemove = dataTable.body.querySelector("tr");
    var rows = dataTable.body.querySelectorAll('tr');
    rows.forEach( x =>{
      dataTable.rows().remove(rowToRemove.dataIndex);
    })
    dataTable.page(1)
    var rows = dataTable.body.querySelectorAll('tr');
    rows.forEach( x =>{
      dataTable.rows().remove(rowToRemove.dataIndex);
    })
  }
// Display Department Wise Employee DataTable
function depEmpDt(){
  var depEmpArr = displayDepDrop();
  depEmpArr.forEach(element =>{
    let dataArr = Object.values(element)
    dataTable.rows().add(dataArr);
  })
}
  // Display Department Dropdown + SoftwareDropdown onChange()
function changeDepSelect(){
  displayDepbtn();
  const depCheck = document.querySelectorAll('#depTable tbody tr');
  if(depCheck == null || depCheck == undefined){
    removedtRows();
    depEmpDt();
  }
  else {
    depCheck.forEach(element =>{
      element.parentNode.removeChild(element)
    })
    let depOption = document.querySelectorAll('.depOption'); //Get Department Select Options
    depOption.forEach(element =>{
      element.parentNode.removeChild(element); //Removing existing department options
    })
    removedtRows();
    depEmpDt(); //Display Employee DataTable Function Call
  }
}

// Adding Software House Select onChange Attribute
const houseSe = document.getElementById('houseSelect');
houseSe.addEventListener("change", changeDepSelect);

//Display Department Employees DataTable
function empDt(){
  var depdtArr = empDataTable();
  depdtArr.forEach(element =>{
    let dataArr = Object.values(element)
    dataTable.rows().add(dataArr);
  })
}

// Display Department wise Employees Datatable
function displayDepEmp(){
  removedtRows();
  empDt();
  displayEmpbtn();
}

//Add Department Select onChange Attribute
const depSe = document.getElementById('depSelect');
depSe.addEventListener("change", displayDepEmp)
//Add CityOnlick
function addCity(){
  add();
  let input = checkInput();
  let existingCities = [];
  myData.cities.forEach(city =>{
    existingCities.push(city.name)
  })
  if(existingCities.includes(input) != true ){
    if(input.length != 0){
      addOption(input);
      addRow(input);
      myData.cities.push({"name":input})
      console.log(myData.cities);
      alert("City Added");
      clearInp();
    }
  }
  else{
    alert("City Already Exists");
  }
}
//Add City
const addCityBtn = document.getElementById('addCitybtn');
addCityBtn.addEventListener("click",addCity)
//Delete City
function delCity(){
  add();
  let input = checkInput();
  if(input.length != 0){
    delOption(input);
    delRow(input);
    delObject(input);
    alert("City Deleted");
    clearInp();
  }
}
//Delete City OnClick
const delCityBtn = document.getElementById('delCitybtn');
delCityBtn.addEventListener("click",delCity)
//Update City
function updateCity(){
  add();
  displayUpdateInp();
  let prevCity = checkInput();
  let newCity = checkUpInput();
  if(prevCity.length != 0 && newCity.length != 0){
    updateOption(prevCity, newCity);
    updateRow(prevCity, newCity);
    upCity(prevCity,newCity);
  }

}
//Update City onClick
const updateCityBtn = document.getElementById('updateCitybtn');
updateCityBtn.addEventListener("click",updateCity)
//Add SoftwareHouse
function addHousebtn(){
  addHouse();
  let name = checkNameInput();
  let location = checkLocationInput();
  let type = checkTypeInput();
  if(name.length != 0){
    addHouseOption(name);
  }
  if(name.length != 0 && location.length != 0 && type.length != 0){
    addHouseRow(name,location,type);
    addHouseObject(name,location,type);
    clearHouseInp();
    alert("Software House Added");
  }
  
}
//Add SoftwareHouse Onclick
const addHouseBtn = document.getElementById('addHousebtn');
addHouseBtn.addEventListener("click",addHousebtn)
//Delete SoftwareHouse
function delHousebtn(){
  delDisplayHouse();
  let name = checkNameInput();
  if(name.length != 0){
    delHouseOption(name);
    delHouseRow(name);
    delHouseObject(name);
    clearHouseInp();
  }
}
//Delete softwareHouse onClick
const delHouseBtn = document.getElementById('delHousebtn');
delHouseBtn.addEventListener("click",delHousebtn)
//Update Software House
function updateHousebtn(){
  displayUpdateHouse();
  let name = checkNameInput();
  let newName = checknewNameInput();
  let newLocation = checknewLocationInput();
  let newType = checknewTypeInput();
  if(name.length != 0){
    updateHouseOption(name, newName);
    updateHouseRow(name,newName,newLocation,newType);
    updateHouseObject(name,newName,newLocation,newType);
    clearHouseInp();
    clearnewHouseInp();
  }
  
}
//Update Software House onClick
const updateHouseBtn = document.getElementById('updateHousebtn');
updateHouseBtn.addEventListener("click",updateHousebtn)
//Add Department
function addDepbtn(){
  let citySelect = document.getElementById('citySelect').value;
  let houseSelect = document.getElementById('houseSelect').value;
  addDep();
  let input = checkDepInput();
  let existingDeps = [];
  myData.cities.forEach(city =>{
    if(citySelect == city.name){
      let softwareHouses = city.softwareHouses;
      softwareHouses.forEach(house =>{
        if(houseSelect == house.name){
          let departments = house.departments;
          departments.forEach(department =>{
            existingDeps.push(department.name);
          })
        }
      })
    }
  })
  if(existingDeps.includes(input) != true ){
    if(input.length != 0){
      addDepOption(input);
      addDepRow(input);
      myData.cities.forEach(city =>{
        if(citySelect == city.name){
          let softwareHouses = city.softwareHouses;
          softwareHouses.forEach(house =>{
            if(houseSelect == house.name){
              let departments = house.departments;
              departments.push({"name":input,
                "employees":[]})
            }
          })
        clearDepInp();
      }
    })
    }
  }
  console.log(myData.cities);
}
//Add Department onClick
const addDepBtn = document.getElementById('addDepbtn');
addDepBtn.addEventListener("click",addDepbtn)
//Delete Department
function delDepbtn(){
  addDep();
  let input = checkDepInput();
  if(input.length != 0){
    delDepOption(input);
    delDepRow(input);
    delDepObject(input);
    alert("Department Deleted");
    clearDepInp();
  }
}
//Delete Deparment onClick
const delDepBtn = document.getElementById('delDepbtn');
delDepBtn.addEventListener("click",delDepbtn)
//Update Department
function updateDepbtn(){
  addDep();
  displayDepUpdateInp();
  let prevDep = checkDepInput();
  let newDep = checkUpDepInput();
  if(prevDep.length != 0 && newDep.length != 0){
    updateDepOption(prevDep, newDep);
    updateDepRow(prevDep, newDep);
    upDep(prevDep,newDep);
  }
}
//Update Employee onClick
const upDepBtn = document.getElementById('updateDepbtn');
upDepBtn.addEventListener("click", updateDepbtn);
//Add Employee
function addEmpbtn(){
  displayEmpInp();
  let empName = checkEmpNameInp();
  let empSalary = checkEmpSalaryInp();
  let empCity = checkEmpCityInp();
  let empMobile = checkEmpMobileInp();
  let empType = checkEmpTypeInp();
  let empdataArr = [];
  if(empName.length != 0 && empType.length != 0 && empCity.length != 0){
    empdataArr.push(empName, empSalary, empCity, empMobile, empType)
  }
  
  let empObj ={
    "name": empName,
    "salary": empSalary,
    "city": empCity,
    "mobileNumber": empMobile,
    "type": empType
  }
  if(empdataArr.length != 0){
    dataTable.rows().add(empdataArr);
    addtoJSON(empObj);
  }
  console.log(myData);
  clearEmpInp();
}
//Add Employee OnClick
const addEmpBtn = document.getElementById('addEmpbtn');
addEmpBtn.addEventListener("click", addEmpbtn);
//Delete Employee
function delEmpbtn(){
  displayEmpInp();
  displayDelInp();
  let empName = checkEmpNameInp();
  if(empName.length != 0){
    delEmpRow(empName);
    delfromJSON(empName);
    clearEmpInp();
  }
}
//Delete Employee OnClick
const delEmpBtn = document.getElementById('delEmpbtn');
delEmpBtn.addEventListener("click", delEmpbtn);
//Update Employee
function updateEmpbtn(){
  displayEmpInp();
  displayUpEmpInp();
  let prevName = checkUpEmpInput();
  let empName = checkEmpNameInp();
  let empSalary = checkEmpSalaryInp();
  let empCity = checkEmpCityInp();
  let empMobile = checkEmpMobileInp();
  let empType = checkEmpTypeInp();
  if(empName.length != 0 && empType.length != 0 && empCity.length != 0 && prevName.length !=0){
    updateEmpRow(prevName, empName, empSalary, empCity, empMobile, empType);
    upEmp(prevName, empName, empSalary, empCity, empMobile, empType)
  }
  clearEmpInp();
}
//Update Employee onClick
const upEmpBtn = document.getElementById('updateEmpbtn');
upEmpBtn.addEventListener("click", updateEmpbtn);

function toggleBtn(){
  dataTable.destroy();
  disableBtn();
}
//Live search button event listener
const liveSearch = document.getElementById('toggleDt');
liveSearch.addEventListener("click", toggleBtn);
//Live Search Input Event Listener
const searchInp = document.getElementById('myInput');
searchInp.addEventListener("keyup",liveSearchInp);

function switchBtn(){
  dataTable.init();
  searchInp.style.display = "none";
  let citySelect = document.getElementById('citySelect');
  citySelect.style.display = "block";
}
//Live search button event listener
const switchdataTable = document.getElementById('switchDt');
switchdataTable.addEventListener("click", switchBtn);
