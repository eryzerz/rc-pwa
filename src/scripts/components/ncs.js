class NcsPage extends HTMLElement {
    
    connectedCallback() {
        this.render()
    }

    initializeCodemirror() {
        const conf = {
            value: '',
            mode: 'javascript',
            theme: 'dracula',
            readOnly: true,
        }

        CodeMirror(document.querySelector('#ncs-1'), {
            ...conf,
            value: `ReactDOM.render(
                <>
                  <MyApp />
                  <MyApp />
                </>,
                document.getElementById('root')
              );`
        });
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <h3>No Component is Singleton</h3>
            <img class="dsdf-img" src="../assets/images/ncs.png" alt="Don't Stop the Data Flow">
            <p class="text-content">Component harus bisa ditampilkan lebih dari satu kali, tanpa merusak apapun. Jadi,
                apabila dipanggil dua kali atau lebih dalam satu view harus dapat tetap beroperasi
                normal.</p>

            <div class="divider"></div>

            <p class="text-content">Kita bisa tes langsung dengan memanggil App component sebanyak panggil dua kali. Contohnya seperti ini</p>

            <pre id="ncs-1"></pre>

            <p class="text-content">Apabila terjadi error atau crash pada suatu component maka artinya terdapat konflik antar component</p>

            <p class="text-content">Karena seharusnya memanggil suatu component maupun itu sekali atau berkali-kali, tidak merusak compoenent yang lainnya</p>

        </div>
        `
        this.initializeCodemirror()
    }
}

customElements.define('ncs-page', NcsPage)