const baseUrl = "http://localhost:8088/api/employees";

let pageSizeDefault = 3;
let pageNumDefault = 0;
let sortingOrderDefault = "DESC";
let totalNumberOfEmployees = 0; //16
let totalNumberOfBuckets = 0;
let currentPage = 0;

//Pagination
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const getTotalEmployee = async () => {
  const response = await fetch(
    "http://localhost:8088/api/employees/all/length"
  );
  const data = await response.json();
  totalNumberOfEmployees = data;
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = async () => {
  totalNumberOfBuckets = Math.ceil(totalNumberOfEmployees / pageSizeDefault);
  for (let i = 1; i <= totalNumberOfBuckets; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = async (pageNumber) => {
  currentPage = pageNumber;
  handleActivePageNumber();

  const url = `${baseUrl}?sortingOrder=${sortingOrderDefault}&pageSize=${pageSizeDefault}&pageNum=${pageNumber}`;
  const response = await fetch(url);
  const data = await response.json();
  paginatedList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    const employeeDataString = `Name : ${data[i].firstName} ${data[i].lastName}, Salary : ${data[i].salary}`;
    const eachEmployeeListItem = document.createElement("li");

    //Discuss Later
    const eachEmployeeListId = `${data[i].employeeId}`;
    eachEmployeeListItem.setAttribute("id", eachEmployeeListId);

    eachEmployeeListItem.innerHTML = employeeDataString;

    //Discuss Later
    eachEmployeeListItem.addEventListener("click", () => {
      let specificEmployeeURL = `${baseUrl}/${eachEmployeeListId}`;
      fetch(specificEmployeeURL)
        .then((res) => {
          res.json().then((data) => {
            alert(JSON.stringify(data));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    paginatedList.appendChild(eachEmployeeListItem);
  }
};

//Optional
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");

    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage + 1) {
      button.classList.add("active");
    }
  });
};

async function main() {
  const url = `http://localhost:8088/api/employees?sortingOrder=${sortingOrderDefault}&pageSize=${pageSizeDefault}&pageNum=${pageNumDefault}`;
  await getTotalEmployee();
  await getPaginationNumbers();
  await setCurrentPage(0);

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex - 1);
      });
    }
  });
}

main();
