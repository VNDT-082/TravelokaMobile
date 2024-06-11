interface KeyValueTypeRoomAndDiscount {
    acturPrice: number;
    maxDiscount: number;
    typeRoomId: string;
}
export default function GetMinDiscountByListTyperoom(arr: ITypeRoom[]): KeyValueTypeRoomAndDiscount {
    var maxDiscount: number = 0;
    var typeRoomId: string = arr[0].id;
    var acturPrice: number = arr[0].Price;
    arr.map(item => {
        if (item.room != undefined) {
            item.room.map(s_item => {
                if (maxDiscount < s_item.Discount) {
                    maxDiscount = s_item.Discount;
                    typeRoomId = item.id;
                    acturPrice = item.Price;
                }
            });
        }
    });
    return { acturPrice, maxDiscount, typeRoomId };
}