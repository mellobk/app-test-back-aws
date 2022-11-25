const inventoryTemplate = (data) => {

    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          .table-container{
            width: 100%;
            >.title{
              text-align: center;
              font-size: 2rem;
              margin: 10px 0;
              font-weight: 700;
            }
          }
          .cursor{
            cursor: pointer;
          }
          table {
            width: 90%;
            margin: 0 auto;
          
            border-collapse: separate;
            border-spacing: 0;
          }
          
          tbody tr:nth-child(odd) {
            background-color: #7D81E0;
            >td{
              color: white ;
            }
            
          }
          
          
          th, td { /* cell */
            padding:1rem;
            font-size: 1.2rem;
          }
          
          th { /* header cell */
            font-weight: 700;
            text-align: left;
            color: #272838;
            border-bottom: 2px solid #7D81E0;
          
            position: sticky;
            top: 0;
            background-color: white;
          }
          
          td { /* body cell */
            color: black;
          }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="3">
                      <table>
                         <tr>
                            <td class="title">Inventario</td>
                            <td>
                               Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                     
                      </table>
                   </td>
                </tr>
           
                <tr>
                <th >id</th>
                <th >Article</th>
                <th >Quantity</th>
                </tr>
                ${data.map((value)=>{
                    return `<tr>
                    <td>${value.dataValues.id}</td>
                    <td>${value.dataValues.article}</td>
                    <td>${value.dataValues.quantity}</td>
                    </tr>`
                })}                
             </table>
             <br />

          </div>
       </body>
    </html>
    `;
};

export default inventoryTemplate