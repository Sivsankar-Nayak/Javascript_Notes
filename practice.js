async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Network response was not ok");
    const user = await response.json();
    //console.log(user);
    
    //destructuring
    user.forEach(({ id, name, address }) => {
      if (address.city === "South Elvis") {
        console.log(`ID: ${id}, Name: ${name} , City: ${address.city}`);
      }
    });
    //filter
    const SouthCristyUser = user.filter(
      (u) => u.address.city === "South Christy"
    );
    SouthCristyUser.forEach(({ id, name, address }) => {
      console.log(`Found ${name} ID: ${id} city: ${address.city}`);
    });
    // map function
    const companyList = user.map((u) => {
      return u.company.name;
    });
    console.log(`CompanyList: ${companyList}`);



    
  } catch (error) {
    console.error("Caught an error:", error.message);
  }
}

getData();
