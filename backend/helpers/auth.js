import bcrypt from 'bcrypt';

export const hashedPassword = async (password) =>{
    return new Promise(async (resolve, reject)=>{
       await bcrypt.genSalt(12, async (err, salt)=>{
        if(err){
            reject(err);
        }
        await bcrypt.hash(password, salt, (err, hash)=>{
            if(err){
                reject(err);
            }
            resolve(hash);
        })
       })
    })
}

export const comparePassword = async  (password, hashed) =>{
    return await bcrypt.compare(password, hashed);
}