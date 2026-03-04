
const STORAGE_KEY = "todos";

export function saveTodos(todos){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodos(){
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored? JSON.parse(stored) : [];
}