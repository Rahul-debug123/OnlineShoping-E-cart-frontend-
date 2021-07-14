export const byPrice=(a,b)=>{
        if(a.price<b.price){
            return -1
        }
        if (a.price>b.price){
            return 1;
        }
        return 0;
}

export const byName=(a,b)=>{
    if(a.name<b.name){
        return -1
    }
    if (a.name>b.name){
        return 1;
    }
    return 0;
}