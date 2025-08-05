import { queryOptions } from "@tanstack/react-query";

export default function createTodoQueryOptions() {
    return queryOptions({
        queryKey: ['todos'],
        queryFn: () => getTodos(),
      })
}

type Todo = {
    userId: number;
    id:number;
    title:string,
    completed: boolean
}

//id: number
  const getTodos = async () : Promise<Todo[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // simulate loading
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`); //comments?postId=${1}
    return await res.json();
  };