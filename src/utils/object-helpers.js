export const updateObjectArrayOverlap = (items, itemId, itemProperty, newObjectProps) => {
    return items.map((item) => {
        if (item[itemProperty] === itemId) {
            return {...item, ...newObjectProps}
        }
        return item;
    })
}