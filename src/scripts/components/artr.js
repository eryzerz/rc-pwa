class ArtrPage extends HTMLElement {
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

        CodeMirror(document.querySelector('#artr-1'), {
            ...conf,
            value: `class TextInput extends React.Component {
                state = {
                  value: ''
                };
                // BAD Resets local state on every parent render
                componentWillReceiveProps(nextProps) {
                  this.setState({ value: nextProps.value });
                }
                handleChange = (e) => {
                  this.setState({ value: e.target.value });
                };
                render() {
                  return (
                    <input
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  );
                }
              }`
        });

        CodeMirror(document.querySelector('#artr-2'), {
            ...conf,
            value: `function TextInput({ value, onChange }) {
                return (
                  <input
                    value={value}
                    onChange={onChange}
                  />
                );
              }`
        });

        CodeMirror(document.querySelector('#artr-3'), {
            ...conf,
            value: `function TextInput() {
                const [value, setValue] = useState('');
                return (
                  <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                );
              }
              
              <TextInput key={formId} />`
        });
    }    

    render() {
        this.innerHTML = `
        <div class="container">
            <h2>Always Be Ready to Render</h2>
            <img class="dsdf-img" src="../assets/images/artr.png" alt="Don't Stop the Data Flow">
            <p class="text-content">Component harus selalu siap untuk di-render kapan saja. Kita harus berhenti untuk
                beranggapan bahwa menerima props merupakan hal yang berbeda dengan proses rendering.
                Karena pada dasarnya kedua hal tersebut sama!</p>

            <div class="divider"></div>

            <p class="text-content">Pada dasarnya React sangat mempersulit kita untuk melanggar prinsip ini. Tapi sebenarnya
                seperti apa
                contoh pattern yang melanggar? Lihat kode berikut</p>
            <pre id="artr-1"></pre>

            <p class="text-content">Pada kasus tersebut kita memiliki local state value dan menerima value dari parent melalui
                props. Ada dua cara untuk merubah value pada component itu, ketika mendapatkan props dan ketika ada perubahan
                pada input. Untuk saat ini masih aman, mungkin karena TextInput hanya mendapatkan props ketika saat-saat
                tertentu, seperti saat menyimpan data form.</p>

            <p class="text-content">Tapi apa yang akan terjadi apabila parent component lebih sering melakukan render? TextInput
                akan kewalahan mengelola local state.</p>

            <p class="text-content">Terdapat dua solusi untuk menghindari masalah tersebut. Pertama, buat component yang
                terkontrol</p>

            <pre id="artr-2"></pre>

            <p class="text-content">Atau kedua, membuat component tidak terkontrol namun menggunakan key untuk me-reset ulang component nanti.</p>

            <pre id="artr-3"></pre>
        </div>
        `

        this.initializeCodemirror()
    }
}

customElements.define('artr-page', ArtrPage)