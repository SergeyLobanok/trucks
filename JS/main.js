document.addEventListener("DOMContentLoaded", ()=> {

    const getResource = async(url) =>{
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Status ${res.status}`);
        }

        return await res.json();
    };

    getResource("dataset.json")
        .then(data =>{
            for(key in data.page_meta){
                if(key === 'h1'){
                    let h1 = document.querySelector('h1');
                    h1.innerHTML = data.page_meta[key];
                }
                if(key === 'title'){
                    let title = document.querySelector('title');
                    title.innerHTML = data.page_meta[key];
                } 
                if(key === 'meta_keywords'){
                    let meta_keywords = document.querySelector('meta[name="keywords"]');
                    meta_keywords.setAttribute("content", data.page_meta[key]);
                }
                if(key === 'meta_description'){
                    let meta_description = document.querySelector('meta[name="description"]');
                    meta_description.setAttribute("content", data.page_meta[key]);
                }
            }

            
 
            function showNavLink(){
                data.nav.forEach(({text, href}) =>{
                    let li = document.createElement('li');
                    li.innerHTML = `
                        <a href="${href}">${text}</a>
                    `;
                    document.querySelector('ul').append(li);
                });
            }

            showNavLink(data);

            
           function showLink(){
            data.breadcrumbs.forEach(({href, text}) =>{
                let span = document.createElement('span');

                span.innerHTML = `
                    <a href="${href}">${text}</a>
                    <img src="./src/img/arrow.png" alt=""/>
                `;

                document.querySelector('.breadcrumbs-links').append(span);
            });
           }

           showLink(data);

            function createCard(){
                data.stock.forEach(({title, image, price, price_currency, year, mileage, mileage_measure,axle_configuration})=>{
                    const div =  document.createElement('div');

                    div.innerHTML = `
                        <div class="content-item">
                            <div class="img">
                                <img src="src/img/${image}" alt="Image">
                            </div>
                            <div class="information">
                                <h3>${title}</h3>
                                <div class="price">
                                    ${price_currency} ${price}
                                </div>
                                <div class="desc">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ex asperiores adipisci impedit id eligendi, sit repellat? Ea, excepturi ut! Consectetur, deserunt eum ipsa voluptate rerum ipsam vero quisquam magnam!
                                </div>
                                <div class="tech-infomation">
                                    <div class="year">
                                        ${year}
                                    </div>
                                    <div class="distance">
                                      ${mileage}  ${mileage_measure}
                                    </div>
                                    <div class="kolo">
                                        ${axle_configuration}
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    `;

                    document.querySelector('.content-items').append(div);
                });
            }

            createCard(data);
            

    });

});    