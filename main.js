// Todoリスト

//要素を取得
const input = document.getElementById('input_text');
const submit = document.getElementById('submit');
const items = document.getElementById('items');


//データ保管
const item_list = [];

//日時取得
const date = new Date();
const y = date.getFullYear();
const mon = date.getMonth()+1;
const d = date.getDate();
const h = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();
const ms = date.getMilliseconds();

const full_date = y+"/"+mon+"/"+d+"/"+h+":"+min+":"+sec+"."+ms;


// データ追加部分
submit.addEventListener('click',function(){
    //input に入力された内容をtextに代入
    const text = input.value;

    //textが空白ならなにもせず
    if(text === ""){
        text = '';
        return
    }

    //データをjson形式でitem_listに追加
    const item_data = {};
    item_data.todo = text;
    item_data.create = full_date;

    //配列にjson形式で追加
    item_list.push(item_data);
    console.log(item_list);

    //list要素作成
    const li = document.createElement('li'); //liを作成
    li.classList.add('item'); //.item 追加

    //done checkbox 作成
    const done = document.createElement('input');
    done.setAttribute('type','checkbox');

    //削除ボタン 作成
    const del = document.createElement('input');
    del.setAttribute('type','button');
    del.setAttribute('value','削除');


    item_list.forEach(function(el){
        li.innerHTML = el["todo"];
    });

    li.appendChild(done); // li の中に done を追加
    li.appendChild(del);  // li の中に del を追加
    items.appendChild(li);

    // inputボックス内のテキストを削除
    input.value = '';

    //update
    li.addEventListener('dblclick',function(){
        console.log('dblclick');
        let content = this.textContent;
        const update = window.prompt("内容を更新できます。", content);
        console.log(update);
        console.log(content);

        if(update == null || update == ""){
            this.textContent = content;
            this.appendChild(done);
            this.appendChild(del);
        }else{
            this.textContent = update;
            this.appendChild(done);
            this.appendChild(del);
        }
    });

    //delete
    del.addEventListener('click',function(){
        console.log("delete");
        const li = this.parentNode;
        li.parentNode.removeChild(li);
    });

    //done
    done.addEventListener('click',function(){
        if(this.checked){
            console.log("on");
            //checkbox が on の時は取り消し線をつける
            const li = this.parentNode;
            li.style.textDecoration = 'line-through';
            li.style.textDecorationColor = '#000';
            li.style.color = "#d3d3d3";
        }else{
            console.log("off");
            //checkbox が off の時は取り消し線を消す
            const li = this.parentNode;
            li.style.textDecoration = 'none';
            li.style.color = "#000";
        }
    });
});
