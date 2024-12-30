import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Modal from 'react-modal';
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import './App.css';

const customStyles = {
  content: {
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    width: '100%',
    maxWidth: '380px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '30px',

  },
};

const customStyles1 = {
  content: {
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    width: '100%',
    maxWidth: '480px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '380px',
    overflow: 'hidden',
    borderRadius: '30px',

  },
};
function App() {
  const dates1 = ["MON 1",
    "TUE 2",
    "WED 3",
    "THUR 4",
    "FRI 5",
    "SAT 6",
    "SUN 7",
    "MON 8",
    "TUE 9",
    "WED 10",
    "THUR 11",
    "FRI 12",
    "SAT 13",
    "SUN 14",
    "MON 15",
    "TUE 16",
    "WED 17",
    "THUR 18",
    "FRI 19",
    "SAT 20",
    "SUN 21",
    "MON 22",
    "TUE 23",
    "WED 24",
    "THUR 25",
    "FRI 26",
    "SAT 27",
    "SUN 28",
    "MON 29",
    "TUE 30",
    "WED 31"];
  const initialIssues1 = [
    { id: 1, name: 'Task 1', logged: 4.5, hours: { "MON 1": 4.5 } },
    { id: 2, name: 'Task 2', logged: 4.5, hours: { "MON 22": 9.5 } },
    { id: 3, name: 'Task 3', logged: 4.5, hours: { "MON 15": 4 } },
    { id: 4, name: 'Task 4', logged: 4.5, hours: { "TUE 16": 6 } },
    { id: 5, name: 'Task 5', logged: 4.5, hours: { "MON 1": 4.5 } },
    { id: 6, name: 'Task 6', logged: 4.5, hours: { "MON 22": 3 } },
    { id: 7, name: 'Task 7', logged: 4.5, hours: { "MON 15": 4 } },
    { id: 8, name: 'Task 8', logged: 4.5, hours: { "TUE 16": 6 } },
    { id: 9, name: 'Task 9', logged: 4.5, hours: { "MON 1": 4.5 } },
    { id: 10, name: 'Task 10', logged: 4.5, hours: { "MON 22": 3 } },
  ]
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  const [issues1, setIssues1] = useState(initialIssues1);
  const [currentDate, setCurrentdate] = useState("01/01/2023- 31/02/2023")
  const [showDialog, setShowDialog] = useState(false);
  const [currentCell, setCurrentCell] = useState(null);

  // Handle opening of the Log Time dialog
  const openLogTimeDialog = (issueId, date) => {
    setCurrentCell({ issueId, date });
    setShowDialog(true);
    setIsOpen1(true);
  };

  // Handle closing of the Log Time dialog
  const closeLogTimeDialog = () => {
    setShowDialog(false);
    setCurrentCell(null);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Handle saving of the logged time
  const handleLogTime = (event) => {
    event.preventDefault();
    const hours = event.target.hours.value;
    // Update the hours for the specific issue and date
    const updatedIssues = issues1.map((issue) => {
      if (issue.id === currentCell.issueId) {
        return {
          ...issue,
          hours: { ...issue.hours, [currentCell.date]: parseFloat(hours) },
        };
      }
      return issue;
    });

    setIssues1(updatedIssues);
    closeLogTimeDialog();
  };

  // Calculate totals for each issue and each day
  const calculateTotals = () => {
    const dayTotals = {};
    const issueTotals = issues1.map((issue) => {
      let total = 0;
      dates1.forEach((date) => {
        total += issue.hours[date] || 0;
        dayTotals[date] = (dayTotals[date] || 0) + (issue.hours[date] || 0);
      });
      return total;
    });
    return { dayTotals, issueTotals };
  };
  const { issueTotals } = calculateTotals();

  return (
    <div class="App">
      <div>
        <div class="container">
          <div class="flex-Row">
            <img src='' />
            <p>Srikanth Gummadi</p>
          </div>
          <div class="flex-Row">
            <select class="selectItem">
              <option>Days</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
            </select>
            <button class='btn-log-time' onClick={openModal}>Log Time</button>
            <button class="btn-three-dots"><HiOutlineDotsHorizontal color="black" size={24} /></button>
          </div>
        </div>

        <div class='subContainer'>
          <div class='btnContainer'>
            <button class='lessthan-btn'><FaLessThan /></button>
            <button class='dateBtn' onClick={() => setIsOpen2(true)}>{currentDate}</button>
            <button class='greaterthanBtn' ><FaGreaterThan /></button>
          </div>
          <div class='textSelect-group'>
            Group by
            <select class='selectItem2' >
              <option>issue</option>
              <option>issue</option>
              <option>issue</option>
            </select>
          </div>
        </div>
      </div>

      <div >
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form class='modalForm' onSubmit={() => { alert("Logged successfully") }} >
            <h1>Log Time</h1>
            <div class='modalContainer'>
              <input class='modalInput' type="text" placeholder="Issue" required />
              <div class='inputGroup'>
                <input type="date" class='dateIinput' required />
                <input type="number" class='numberInput' placeholder="5" required />
              </div>
              <input type="text" class='textInput' placeholder="Description" required />
            </div>
            <div class='btnGroup'>
              <button class='modalCloseBtn' onClick={closeModal} >Cancel</button>
              <input type="submit" value="Log time" class='submitBtn' />
            </div>
          </form>
        </Modal>



        <Modal
          isOpen={modalIsOpen2}
          onRequestClose={closeModal}
          style={customStyles1}
          contentLabel="Example Modal"
        >
          <form class='modalForm' onSubmit={() => { alert("Logged successfully") }} >
            <div class='modalContainer1'>
              <div class='inputGroup'>
                <div class='labelInput'>
                  <label>Start date</label>
                  <input type="date" class='dateIinput1' required />
                </div>
                <div class='labelInput'>
                  <label>End date</label>
                  <input type="date" class='numberInput1' placeholder="5" required />
                </div>
              </div>
              <div class='daysGroup'>
                <a>Current Week</a>
                <a>Last Week</a>
                <a>Current month</a>
                <a>Last month</a>
                <a>Current quarter</a>
                <a>Last quarter</a>
                <input type="number" class='dayInput' /> days
              </div>
            </div>
            <div class='btnGroup'>
              <button class='modalCloseBtn' onClick={() => setIsOpen2(false)} >Cancel</button>
              <input type="submit" value="Apply" class='submitBtn' />
            </div>
          </form>
        </Modal>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table >
          <tr  >
            <th class='table-header ' >Issue</th>
            <th style={{ width: '100px' }} >Logged</th>
            <th><span class='dateHeader'>MON</span> <br />1</th>
            <th><span class='dateHeader'>TUE</span> <br />2</th>
            <th><span class='dateHeader'>WED</span> <br />3</th>
            <th><span class='dateHeader'>THUR</span> <br />4</th>
            <th><span class='dateHeader'>FRI</span> <br />5</th>
            <th><span class='dateHeader'>SAT</span> <br />6</th>
            <th><span class='dateHeader'>SUN</span> <br />7</th>
            <th><span class='dateHeader'>MON</span> <br />8</th>
            <th><span class='dateHeader'>TUE</span> <br />9</th>
            <th><span class='dateHeader'>WED</span> <br />10</th>
            <th><span class='dateHeader'>THUR</span> <br />11</th>
            <th><span class='dateHeader'>FRI</span> <br />12</th>
            <th><span class='dateHeader'>SAT</span> <br />13</th>
            <th><span class='dateHeader'>SUN</span> <br />14</th>
            <th><span class='dateHeader'>MON</span> <br />15</th>
            <th><span class='dateHeader'>TUE</span> <br />16</th>
            <th><span class='dateHeader'>WED</span> <br />17</th>
            <th><span class='dateHeader'>THUR</span> <br />18</th>
            <th><span class='dateHeader'>FRI</span> <br />19</th>
            <th><span class='dateHeader'>SAT</span> <br />20</th>
            <th><span class='dateHeader'>SUN</span> <br />21</th>
            <th><span class='dateHeader'>MON</span> <br />22</th>
            <th><span class='dateHeader'>TUE</span> <br />23</th>
            <th><span class='dateHeader'>WED</span> <br />24</th>
            <th><span class='dateHeader'>THUR</span> <br />25</th>
            <th><span class='dateHeader'>FRI</span> <br />26</th>
            <th><span class='dateHeader'>SAT</span> <br />27</th>
            <th><span class='dateHeader'>WED</span> <br />28</th>
            <th><span class='dateHeader'>THUR</span> <br />29</th>
            <th><span class='dateHeader'>FRI</span> <br />30</th>
            <th><span class='dateHeader'>SAT</span> <br />31</th>
          </tr>
          {issues1?.map((item) => (
            <tr>
              <td>
                {item.name}
              </td>
              <td>
                {item.logged}
              </td>
              {dates1?.map((date) => (
                <td onClick={() => openLogTimeDialog(item.id, date)} >  {item.hours[date] || ' '}</td>
              ))}
            </tr>))}
          <tr>
            <td colSpan="2" >
              <div class='tableRow'>
                <span >Total</span><span> {issueTotals.reduce((total, val) => val + total)}</span>
              </div>
            </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
      </div>

      {showDialog && (<Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        class='modal'
      >
        <div class='modalContainer'>
          <h3 >Log Time</h3>
          <form onSubmit={handleLogTime} class='modalForm' >
            <label class='label'>
              Hours:
              <input class='modalnumberInput' type="number" name="hours" min="0" max={12} step="0.5" required
                defaultValue={issues1.find((issue) => issue.id === currentCell.issueId).hours[currentCell.date]}
              />
            </label>
            <br />
            <div class='modalbtnGroup'>
              <button class='modalsubmitBtn' type="submit">Save</button>
              <button class='modalCloseBtn1' type="button" onClick={closeLogTimeDialog}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>)
      }
    </div>
  );
}

export default App;
