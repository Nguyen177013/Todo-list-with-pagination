const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let current_page = 1;
let rows = 5;
let todo = (() =>{
        let list = [];
        const todoSubmit = $('.todoSubmit');
        const text = $('input[type="text"]');
        const todoList = $('.todoList');
        const totalList = $('.totalList');
        const pagination = $('#pagination');
        return {
            add(task){
                list.push(task)
            },
            remove(num){
                list.splice(list.indexOf(num), 1);
            },
            handleRemove(e){
                console.log(this);
                const check = (e.target.closest('.deleteList'));
                if(check){
                    this.remove(check.dataset.index)
                    this.render(list,rows,current_page);
                    this.SetupPagination(list,rows)
                }
            },
            PaginationButton(page,items){
                let button = document.createElement('button');
                button.innerText = page;
                
                if(current_page === page)
                button.classList.add('active');
                button.onclick = ()=>{
                    current_page = page;
                    this.render(items,rows,current_page);
                }
                return button;
            },
            SetupPagination(items,rows_per_page){
                pagination.innerHTML = '';
                let page_count = Math.ceil(items.length / rows_per_page);
                for(let i=1;i<page_count+1;i++){
                    let html = this.PaginationButton(i,list);
                    pagination.appendChild(html);
                }
            },
            render(list,row,current_page){
                current_page--;
                let start = row * current_page;
                let end = start + row;
                let displayList = list.slice(start, end);  
                const html = displayList.map((value)=>{
                    return `<p class="center listValue" >
                    ${value}
                    <button class="deleteList" data-index =${value}>Delete</button>
                    </p>`
                }).join('')
                todoList.innerHTML = html;
                totalList.innerText = `Task need todo: ${list.length}`
            },
            init(){
                todoSubmit.onclick = ()=>{
                    if(text.value){
                        this.add(text.value);
                        this.render(list,rows,current_page);
                        this.SetupPagination(list,rows);
                        text.value = '';
                    }
                }
                todoList.onclick = this.handleRemove.bind(this);
            }
        }
    })()
    todo.init();