const formatCreationDate = (creationDate) => {
    return creationDate.replace(/\//g, '.');
}

export default formatCreationDate;