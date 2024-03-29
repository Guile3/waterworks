const login = async () => {
  const url = "http://128.199.232.132//waterworks/login.php";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Fill in both username and password fields");
  } else {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(url, formData);
      //console.log(response);

      if (response.data.success) {
        const { usertype, userDetails } = response.data;
        console.log(response.data);

        // Store user information in sessionStorage
        if (usertype === "Consumer") {
          sessionStorage.setItem(
            "fullname",
            userDetails.firstname +
              " " +
              userDetails.middlename +
              " " +
              userDetails.lastname
          );
          sessionStorage.setItem(
            "address",
            userDetails.zone_name +
              ", " +
              userDetails.barangay_name +
              ", " +
              userDetails.municipality_name
          );
          sessionStorage.setItem("location", userDetails.barangayId);
          // ssessionStorage.setItem("branchId", userDetails.branchId);
          sessionStorage.setItem("barangayId", userDetails.barangay_id);
          sessionStorage.setItem("branchName", userDetails.branch_name);
          sessionStorage.setItem("positionName", userDetails.position_name);
          sessionStorage.setItem("propertyId", userDetails.propertyId);
          sessionStorage.setItem("phone_no", userDetails.phone_no);
          sessionStorage.setItem("meter", userDetails.meter_no);
          sessionStorage.setItem("email", userDetails.email);
          sessionStorage.setItem("accountId", userDetails.user_id);

          window.location.href = "./consumer/html/dashboard.html";
        } else {
          // Assuming the default case is for employees
          sessionStorage.setItem(
            "fullname",
            userDetails.firstname + " " + userDetails.lastname
          );
          sessionStorage.setItem(
            "address",
            userDetails.barangayName +
              ", " +
              userDetails.municipalityName +
              ", " +
              userDetails.provinceName
          );
          sessionStorage.setItem("branchId", userDetails.branchId);
          sessionStorage.setItem("branchName", userDetails.branch_name);
          sessionStorage.setItem("positionName", userDetails.position_name);
          sessionStorage.setItem("phone_no", userDetails.phone_no);
          sessionStorage.setItem("usernames", userDetails.username);
          sessionStorage.setItem("email", userDetails.email);
          sessionStorage.setItem("barangayId", userDetails.barangayIds);
          sessionStorage.setItem("accountId", userDetails.user_id);

          // Adjust the following cases based on your specific usertype values
          switch (usertype) {
            case "Admin":
              window.location.href = "./admin/html/dashboard.html";
              break;
            case "Head":
              window.location.href = "./head/html/dashboard.html";
              break;
            case "Clerk":
              window.location.href = "./clerk/html/dashboard.html";
              break;
            case "Meter Reader":
              window.location.href = "./meterreader/html/dashboard.html";
              break;

            default:
              alert("Unknown usertype");
          }
        }
      } else {
        failed_modal();
        console.log(response.data);
      }
    } catch (error) {
      error_modal();
      console.log(error.message);
    }
  }
};
const failed_modal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");
  var html = `
          <h5 class="modal-title " style="color: red; text-align:center;">Login Failed</h5>
      `;
  modalContent.innerHTML = html;
  modal.style.display = "block";
};
const error_modal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");
  var html = `
          <h5 class="modal-title " style="color: red; text-align:center;">Unknown error occurred !</h5>
      `;
  modalContent.innerHTML = html;
  modal.style.display = "block";
};
const closeModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
};
const inputs = document.querySelectorAll(".input");

function addClass() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function removeClass() {
  let parent = this.parentNode.parentNode;
  if (this.value === "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addClass);
  input.addEventListener("blur", removeClass);
});
