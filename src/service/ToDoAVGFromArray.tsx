export default function ToDoAVGFromArray(arr: IRate[]) {
    let total = 0;
    arr.map(item => {
        total += item.Rating;
    });
    return (total / arr.length).toFixed(1);
}