//Main add button to add tasks
document.getElementById("addbutton").addEventListener('click',function (){
    var value = document.getElementById("inputitem").value;
    if(value)
    {
        additem(value);
        value = document.getElementById("inputitem").value ="";
    }
})

//function to add listitem in incompleted and completed lists.
function additem(value){

    var item = document.createElement('li');//create list item
    item.innerText = value;

    var btndiv = document.createElement("div")//create div
    btndiv.classList.add("buttons")

    var remove = document.createElement("button");//create remove buttton
    remove.innerHTML = '<i class="far fa-trash-alt"></i>'

    //To Remove element using remove button
    remove.addEventListener('click',function(){
        //function(e)
        //e.target is used to get target
        var delitem = this.parentElement.parentElement; // to grab listitem to be delete
        var mainul = delitem.parentElement;//to grab ul
        mainul.removeChild(delitem)
        TextShown();//to handle paragraph-message and divider
    })

    var complete = document.createElement("button");
    complete.innerHTML = '<i class="far fa-check-circle"></i>'
    //Completeitem: Remove item from incomplete ul and add to complete ul
    complete.addEventListener('click',function(){
      complete.childNodes[0].classList.add("completeicon");
        var delitem = this.parentElement.parentElement;
        var mainul = delitem.parentElement;
        var id = mainul.id;
        mainul.removeChild(delitem)
        
        if(id === "incompleted")
        {
            target = document.getElementById("completed")
        }
        else{
            target = document.getElementById("incompleted");
            this.childNodes[0].classList.remove("completeicon");
        }

        // var target = (id === "incompleted") ? document.getElementById("completed") : document.getElementById("incompleted");
        // console.log(target)
        target.insertBefore(item,target.childNodes[0]);
        TextShown();
    })


    item.appendChild(btndiv)
    btndiv.appendChild(remove);
    btndiv.appendChild(complete);

    var ul = document.getElementById("incompleted");
    ul.insertBefore(item,ul.childNodes[0]);
    TextShown();
    
}

function TextShown(){//to check when to show show complete task(text), incomlpete task(text) and divider
    var completed=  document.getElementById("completed").hasChildNodes();
    if(completed)
    {
        document.getElementById("divide").classList.add("divider")
        document.getElementById("completepara").classList.remove("dnone")

    }
    else{
        document.getElementById("divide").classList.remove("divider");
        document.getElementById("completepara").classList.add("dnone");

    }

    var incompleted =  document.getElementById("incompleted").hasChildNodes();
    if(incompleted)
    {
        document.getElementById("incompletepara").innerText = "Tasks to be completed";

    }
    else
    {
        document.getElementById("incompletepara").innerText = "No active tasks";
    }

}
TextShown()
