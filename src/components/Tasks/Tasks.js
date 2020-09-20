import React, { Component } from 'react';



class showTasks extends Component {
    constructor(tasks) {
        this.tasks = tasks;
      }

    render() {
        const {tasks} = this.tasks;
        if(tasks =='null'){
            return <div>Error in loading</div>
        }else if (tasks.length == 0 ) {
            return <div> no hay datos </div>
        }else{
            return(
                <div>
                    <ol className="item">
                    {
                        tasks.map(post => (
                            <li key={post.id} align="start">
                                <div>
                                    <p className="title">{post.title}</p>
                                    <p className="body">{post.body}</p>
                                </div>
                            </li>
                        ))
                    }
                    </ol>
                </div>
            );
        }
      
    }
}

export default showTasks;