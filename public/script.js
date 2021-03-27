/* eslint-disable max-len */


  //taking in map 
  async function dataHandler(){
   
    //getting data from the api 
    const wait = await fetch('/api/dining');
    const data_api = await wait.json();
    const data = data_api.data;
    const table = document.querySelector('.table');

    console.log(data);

    data.forEach(element => {
      console.log(element.hall_name);
      console.log(element.hall_address);
      console.log(element.hall_id)
      const appendItem = document.createElement('tr');
      appendItem.innerHTML = `<td>${element.hall_id}</td><td>${element.hall_name}</td><td>${element.hall_address}</td>`;
      table.append(appendItem);
      
    });



    
   

    //targetList.append(appendItem);
 
  }
  
    async function windowActions(){
    
      await dataHandler();
    }
  
  window.onload = windowActions;