/* Step 1: Adding table header for the new column */

function addSubmissionColumnHeader() {

    var ele = document.createElement("th"); 

    ele.setAttribute("class", "reactable-th-status reactable-header-sortable");

    ele.setAttribute("role", "button");

    ele.setAttribute("tabindex", "0");

    var txtToIns = document.createElement("strong")

    txtToIns.append("Submissions")

    ele.append(txtToIns)

    var ele1 = document.getElementsByClassName("reactable-column-header")

    ele1[0].append(ele)

}


/* Step 2: Returning API endpoint as a string */

function getApiUrl() {

    return 'https://leetcode.com/api/problems/all/'
}





/* Step 3: Fetching submissions data of all problems */


async function getAllProblems(apiUrl) {
    var data = [];
    var allProblems = [];
  
    var temp = await fetch(apiUrl).then(function(res) { return res.json();})

    data = await (temp.stat_status_pairs);
    
    for (let i = 0; i < data.length; i++){
        allProblems.push({
        id: data[i].stat.frontend_question_id,
        total_submitted: data[i].stat.total_submitted,
        total_acs: data[i].stat.total_acs
      })
    }
  
    return allProblems;
}






/* Step 4: Getting every problem's row in the form of an array */


function getAllProblemRowElements() {

    return Array.from(document.querySelectorAll('#question-app > div > div:nth-child(2) > div.question-list-base > div.table-responsive.question-list-table > table > tbody.reactable-data > tr'))
}






/* Step 5: Adding total_acs / total_submitted to each row element of the table on the page. Iterating through each row element and adding a new <td> containing the submission data in the provided format
 */
function addSubmissionsToEachProblem(allProblemRowElements, allProblems) {

    for ( i = 0; i < allProblemRowElements.length ; i++) {

        for ( j = 0; j<allProblems.length; j++) { 
    
    
            if ( allProblems[j].id === parseInt(allProblemRowElements[i].getElementsByTagName('td').item(1).innerHTML)) { 
    
    
                    var x = allProblems[j].total_acs.toString();
                    var y = allProblems[j].total_submitted.toString();   
                  
                    var submit = document.createElement("td"); 
                    // submit.setAttribute("label", "Submissions")
                    submit.innerHTML = x + "/" + y;
    
                    document.getElementsByClassName("reactable-data")[0].rows[i].append(submit);}
                    
    
        }
    }
}


/* Step 6: Putting it all together */

async function createSubmissionColumnForLeetCode() {

     addSubmissionColumnHeader();
     let apiUrl = getApiUrl();
     let allProblems = await getAllProblems(apiURL);
     let allProblemRowElements = getAllProblemRowElements();
     addSubmissionsToEachProblem(allProblemRowElements, allProblems);
    
}

/* Step 7: Additional code for making script good to work with tampermonkey. Code checks for presence of table on DOM every 100ms and executes after confirmation */

 let tableCheck = setInterval(() => { 

    var table = document.querySelector("#question-app > div > div:nth-child(2) > div.question-list-base > div.table-responsive.question-list-table > table");

    if (table) {
        clearInterval(tableCheck);
        createSubmissionColumnForLeetCode();
    }

 } , 100);



