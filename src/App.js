import {Component} from "react";
import './App.css';
import axios from "axios"
import image2 from "./image2.png"


class App extends Component{
  state = {option :"",fromDate:"",toDate:"",successMsg:"",failureMsg:"",fileName:"",uploading:false}

  changeOption = (event,selectedOption) => {
     this.setState({option:selectedOption})
  }

  changeFromData =(event)=> {
    const fromDateValue = event.target.value;
    const fromDate = new Date(fromDateValue);

    const toDateInput = document.getElementById("to");
    toDateInput.min=fromDateValue; 

    const lastDay = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0).getDate();
    const toDateValue = toDateInput.value
    const maxDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), lastDay);
    maxDate.setDate(maxDate.getDate() + 1);
    toDateInput.value="";
    toDateInput.max = maxDate.toISOString().split('T')[0];

    if (toDateValue) {
      const selectedDay = new Date(toDateValue).getDate();
      toDateInput.value = new Date(maxDate.getFullYear(), maxDate.getMonth(), selectedDay).toISOString().split('T')[0];
    }
    

    this.setState({fromDate: fromDateValue})
  }


  changeToDate =(event) => {
    const toDateValue = event.target.value
    this.setState({toDate: toDateValue})
  }
  
  handleFileUpload = async(event) => {
    event.preventDefault();
    this.setState({uploading:true})
    const file_select = event.target.files[0];
    const formData = new FormData();
    formData.append('file',file_select);
    formData.append('fromDate', this.state.fromDate);
    formData.append('toDate', this.state.toDate);
    formData.append('department', this.state.option);

    console.log(formData)
    await axios.post('http://localhost:5000/upload', formData, {
      headers: {'Content-Type':'multipart/form-data'}
    }).then(response => {
      document.getElementById("from").value = "";
      document.getElementById("to").value = "";

      this.setState({ option: ""});
      
      if (response.data.status === "failure") {
        if (response.data.error) {
          const failureMsgError = response.data.error;
          this.setState({ failureMsg: failureMsgError, successMsg: "" });
          setTimeout(() => {
            this.setState({ failureMsg: "" });
          }, 5000);
        } else if (response.data.missing_dates) {
          const missingDates = response.data.missing_dates.join(', ');
          const failureMsgError = `${missingDates} dates data is missing. Please upload them.`;
          this.setState({ failureMsg: failureMsgError, successMsg: "" });
          setTimeout(() => {
            this.setState({ failureMsg: "" });
          }, 5000);
        } else {
          const failureMsgError = "File upload failed. Please try again.";
          this.setState({ failureMsg: failureMsgError, successMsg: "" });
          setTimeout(() => {
            this.setState({ failureMsg: "" });
          }, 5000);
        }
      } else if (response.data.status === "success") {
        this.setState({ successMsg: "File Uploaded Successfully", failureMsg: ""});
        setTimeout(() => {
          this.setState({ successMsg: "" });
        }, 5000);
      }
    }).catch(err=> {
      console.log("Upload error:", err);
    })
    this.setState({uploading:false})
  }
   

  render(){
    const {option,successMsg,failureMsg,uploading} = this.state;
    return (
      <div className="app">
        <nav className="navbar">
               <img className="logoimage" src="https://res.cloudinary.com/dqcd0lwea/image/upload/v1681451853/nuron_2018-03_rzc7qs.png" alt="mylogo"/>
        </nav>
        <div className="second-div">
           <div className="text-div">
              <h1 className="heading3">Streamline Data Storage and Analysis for Enhanced Insights and Efficiency</h1>
              <p className="para">Our application is specifically designed to meet the unique data storage and analysis needs of our company. With our intuitive interface, you can effortlessly store and organize our valuable data, ensuring easy access for analysis and backups.</p>
           </div>
           <div className="image-div">
             <img className="graph-image1" src={image2} alt="image2"/>
           </div>
        </div>
        <div className="third-div">
          <img className="bubble-image" src="https://rmpublicity.com/wp-content/themes/kappow/assets/images/blob_shape.svg" alt="bubble"/>
          <img className="image1" src="https://www.nuron.co.in/wp-content/uploads/2022/07/image-section-75-min-2.png" alt="image1"/>
          <div className="inputs-div">
            <div className="div-1">
              <p className="department">Select your Department</p>
              <div className="dropdown-container">
                <div className="dropdown">
                  <span className="selected-option">{option || 'Select Your Department'}</span>
                  <ul className="options">
                    <li onClick={(event) => this.changeOption(event, 'Sales')}>Sales</li>
                    <li onClick={(event) => this.changeOption(event, 'Netops')}>Netops</li>
                    <li onClick={(event) => this.changeOption(event, 'CustomerCare')}>CustomerCare</li>
                    <li onClick={(event) => this.changeOption(event, 'Engineering')}>Engineering</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="div-2">
              <div className="from-date">
                <value for="from" className="from-label">From</value>
                <input id="from" onChange={this.changeFromData} type="date"/>
              </div>
              <div className="to-date">
                <value for="to" className="to-label">To</value>
                <input id="to" onChange={this.changeToDate} type="date"/>
              </div>
            </div>
            <div>
              <input type="file" onChange={this.handleFileUpload} style={{display: "none"}} ref={fileInput => this.fileInput = fileInput} />
              <button className="button1" onClick={() => this.fileInput.click()}>Upload File</button>
              {uploading && (<p className="errorMsg">Please wait, your file is being uploaded...</p>)}
              {successMsg && (<p className="errorMsg">{successMsg}</p>)}
              {failureMsg && (<p className="errorMsg">{failureMsg}</p>)}
            </div>
            <img className="bubble-image2" src="https://rmpublicity.com/wp-content/themes/kappow/assets/images/blob_shape.svg" alt="bubble"/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
