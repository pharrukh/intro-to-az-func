let Persons = [
    {
        id: "1",
        name: "Farrukh"
    },
    {
        id: "2",
        name: "Mikhail"
    }
]

module.exports = async function (context, req) {
    if (req.method === 'GET') {
        const id = context.bindings.req.params ? context.bindings.req.params.id : null
        if(id){
            const result = Persons.find(p=>p.id == id)
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: result
            };
        }else{
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: Persons
            };
        }
    }else if(req.method === 'POST'){
        Persons.push(req.body)
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: Persons
        };
    }else if(req.method === 'DELETE'){
        const id = context.bindings.req.params ? context.bindings.req.params.id : null
        Persons = Persons.filter(p=>p.id != id)
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: Persons
        };
    }
    else {
       
    }
};