class StartPage extends HTMLElement {

    connectedCallback() {
        this.render()
    }

    // set loader(e) {
    //     this._loader = e
    //     this.render()
    // }

    async loadContent(page) {
        try {

            const res = await fetch(`/pages/${page}.html`);

            if (res.status === 200) {
                const content = await res.text();
                const body = document.querySelector("#body-content")

                body.innerHTML = content

            } else {
                console.error("Something went wrong on load content!");
            }
        } catch (err) {
            console.error(`Something went wrong on load content! ${err}`);
        }
    };

    render() {
        this.innerHTML = `
        <div class="container">
            <h2>Apa itu ReactRC?</h2>
            <p class="text-content">ReactRC itu singkatan dari React Resilient Component. Prinsip ini disuarakan oleh Dan Abramov, salah
                satu developer yang membangun Redux dan Create React App. Metode ini apabila digunakan dapat mempermudah
                pengolahan data di setiap component, tanpa mengganggu proses rendering. Sepertihalnya cara Marie Kondo untuk
                mengorganisir barang-barang di rumahmu, perbedaannya cara dari Dan Abramov ini untuk mengorganisir
                component-component
                di project-mu.</p>
        
            <h4>Bagaimana Cara Membuat Resilient Component?</h4>
            <ul>
                <li>
                    <div class="row">
                        <div class="col s12">
                            <div class="card blue-grey darken-1 z-depth-5">
                                <div class="card-content white-text">
                                    <span class="card-title">Don't Stop the Data Flow (DSDF)</span>
                                    <p>Ketika ada yang ingin menggunakan suatu component, maka harapannya pasti component
                                        tersebut dapat menerima berbagai props dan component akan menampilkan perubahannya.
                                        Maka, jangan merusak alur data tersebut dengan memasangkan nilai props pada state</p>
                                </div>
                                <div class="card-action">
                                    <a href="#dsdf">Lebih lanjut</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="row">
                        <div class="col s12">
                            <div class="card blue-grey darken-1 z-depth-5">
                                <div class="card-content white-text">
                                    <span class="card-title">Always be ready to render (ARTR)</span>
                                    <p>Component harus selalu siap untuk di-render kapan saja. Kita harus berhenti untuk
                                        beranggapan bahwa menerima props merupakan hal yang berbeda dengan proses rendering.
                                        Karena pada dasarnya kedua hal tersebut sama!</p>
                                </div>
                                <div class="card-action">
                                    <a href="#artr">Lebih lanjut</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="row">
                        <div class="col s12">
                            <div class="card blue-grey darken-1 z-depth-5">
                                <div class="card-content white-text">
                                    <span class="card-title">No component is a singleton (NCS)</span>
                                    <p>Component harus bisa ditampilkan lebih dari satu kali, tanpa merusak apapun. Jadi,
                                        apabila dipanggil dua kali atau lebih dalam satu view harus dapat tetap beroperasi
                                        normal.</p>
                                </div>
                                <div class="card-action">
                                    <a href="#ncs">Lebih lanjut</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="row">
                        <div class="col s12">
                            <div class="card blue-grey darken-1 z-depth-5">
                                <div class="card-content white-text">
                                    <span class="card-title">Keep the local state isolated (KLSI)</span>
                                    <p>Hindari membuat state global sesering mungkin. Jangan semua state dimasukan ke dalam
                                        local state, pertimbangkan semua dengan baik, untuk menghindari terjadinya
                                        "over-rendering</p>
                                </div>
                                <div class="card-action">
                                    <a href="#klsi">Lebih lanjut</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        `

        this.querySelectorAll('.card-action a').forEach(anchor => {
            anchor.addEventListener('click', async () => {
                const page = anchor.getAttribute("href") ? anchor.getAttribute("href").slice(1) : "start"
                await this.loadContent(page);
            })
        })
    }
}

customElements.define('start-page', StartPage)