class Dsdf extends HTMLElement {

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

        CodeMirror(document.querySelector('#dsdf-1-1'), {
            ...conf,
            value: `const Button = ({ color, children }) => {
                return (
                  // GOOD, color is always fresh!
                  <button className={'Button-' + color}>
                      {children}
                  </button>
              );
              }`
        });
        CodeMirror(document.querySelector('#dsdf-1-2'), {
            ...conf,
            value: `class Button extends React.Component {
                state = {
                    color: this.props.color
                };
    
                render() {
                    const { color } = this.state; // BAD color is stale!
                    return (
                        <button className={'Button-' + color}>
                        {this.props.children}
                        </button>
                    );
                }
            }`
        });
        CodeMirror(document.querySelector('#dsdf-1-3'), {
            ...conf,
            value: `function Button({ color, children }) {
                const textColor = useMemo(
                    () => slowlyCalculateTextColor(color),
                    [color] // GOOD Don’t recalculate until color changes
                );
                return (
                    <button className={'Button-' + color + ' Button-text-' + textColor}>
                        {children}
                    </button>
                );
            }`
        });
        CodeMirror(document.querySelector('#dsdf-2-1'), {
            ...conf,
            value: `class SearchResults extends React.Component {
                state = {
                    data: null,
                    currentPage: 0,
                };
                componentDidMount() {
                    this.fetchResults();
                }
                componentDidUpdate(prevProps) {
                    if (prevProps.query !== this.props.query) {
                        this.fetchResults();
                    }
                }
                fetchResults() {
                    const url = this.getFetchUrl();
                    // Do the fetching...
                }
                getFetchUrl() {
                    return (
                        'http://myapi/results?query' + this.props.query +
                        '&page=' + this.state.currentPage // 🔴 Updates are ignored
                    );
                }
                render() {
                    // ...
                }
            }`
        });
        CodeMirror(document.querySelector('#dsdf-2-2'), {
            ...conf,
            value: `class SearchResults extends React.Component {
                state = {
                    data: null,
                    currentPage: 0,
                };
                componentDidMount() {
                    this.fetchResults();
                }
                componentDidUpdate(prevProps, prevState) {
                    if (
                        prevState.currentPage !== this.state.currentPage || // ✅ Refetch on change
                        prevProps.query !== this.props.query
                    ) {
                        this.fetchResults();
                    }
                }
                fetchResults() {
                    const url = this.getFetchUrl();
                    // Do the fetching...
                }
                getFetchUrl() {
                    return (
                        'http://myapi/results?query' + this.props.query +
                        '&page=' + this.state.currentPage // ✅ Updates are handled
                    );
                }
                render() {
                    // ...
                }
            }`
        });
        CodeMirror(document.querySelector('#dsdf-2-3'), {
            ...conf,
            value: `function SearchResults({ query }) {
                const [data, setData] = useState(null);
                const [currentPage, setCurrentPage] = useState(0);
            
                useEffect(() => {
                function fetchResults() {
                    const url = getFetchUrl();
                    // Do the fetching...
                }
            
                function getFetchUrl() {
                    return (
                    'http://myapi/results?query' + query +
                    '&page=' + currentPage
                    );
                }
            
                fetchResults();
                }, [currentPage, query]); // ✅ Refetch on change
            
                // ...
            }`
        });
        CodeMirror(document.querySelector('#dsdf-3-1'), {
            ...conf,
            value: `class Button extends React.Component {
                shouldComponentUpdate(prevProps) {
                    // 🔴 Doesn't compare this.props.onClick 
                    return this.props.color !== prevProps.color;
                }
                render() {
                const onClick = this.props.onClick; // 🔴 Doesn't reflect updates
                const textColor = slowlyCalculateTextColor(this.props.color);
                return (
                    <button
                        onClick={onClick}
                        className={'Button-' + this.props.color + ' Button-text-' + textColor}>
                        {this.props.children}
                    </button>
                );
                }
            }`
        });
        CodeMirror(document.querySelector('#dsdf-3-2'), {
            ...conf,
            value: `class MyForm extends React.Component {
                state = {
                isEnabled: true
                };
                handleClick = () => {
                this.setState({ isEnabled: false });
                // Do something
                }
                render() {
                return (
                    <>
                    <h1>Hello!</h1>
                    <Button color='green' onClick={
                        // 🔴 Button ignores updates to the onClick prop
                        this.state.isEnabled ? this.handleClick : null
                    }>
            
                        Press me
                    </Button>
                    </>
                )
                }
            }`
        });
        CodeMirror(document.querySelector('#dsdf-3-3'), {
            ...conf,
            value: `shouldComponentUpdate(prevProps) {
                // ✅ Compares this.props.onClick 
                return (
                    this.props.color !== prevProps.color ||
                    this.props.onClick !== prevProps.onClick
                );
            }`
        });
        CodeMirror(document.querySelector('#dsdf-3-4'), {
            ...conf,
            value: `function Button({ onClick, color, children }) {
                const textColor = slowlyCalculateTextColor(color);
                return (
                    <button
                        onClick={onClick}
                        className={'Button-' + color + ' Button-text-' + textColor}>
                        {children}
                    </button>
                );
            }
            export default React.memo(Button);`
        });
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <h2>Don't Stop the Data Flow</h2>
            <img class="dsdf-img" src="../assets/images/dsdf.png" alt="Don't Stop the Data Flow">
            <p class="text-content">Ketika ada yang ingin menggunakan suatu component, maka harapannya pasti component
                tersebut dapat menerima berbagai props dan component akan menampilkan perubahannya.
                Maka, jangan merusak alur data tersebut dengan memasangkan nilai props pada state</p>
        
            <div class="divider"></div>
            <h4>Saat Rendering</h4>
            <p class="text-content">Pada umumnya React bekerja seperti ini. Apabila component Button ini hendak mengunakan props
                color, maka penggunaannya seperti ini</p>
            <pre id="dsdf-1-1"></pre>
            <p class="text-content">Namun, seringkali terjadi kesalahan umum seperti ini</p>
            <pre id="dsdf-1-2"></pre>
            <p class="text-content">Dengan menyalin nilai props ke state, maka component tersebut akan mengabaikan semua
                pembaruan. Tapi, apabila props memang harus diolah terlebih dahulu kita dapat menggunakan useMemo</p>
            <pre id="dsdf-1-3"></pre>
            <div class="divider"></div>
            <h4>Saat Side Effect</h4>
            <p class="text-content">Side effect termasuk dalam data flow, jadi harus dipertimbangkan juga. Apabila kita akan
                melakukan request API, namun request tersebut hanya kita ingin lakukan apabila ada perubahan props query, maka
                kita akan
                melakukan seperti ini</p>
            <pre id="dsdf-2-1"></pre>
            <p class="text-content">Lalu, bagaimana jika terdapat props untuk pagination dan kita hanya ingin melakukan request
                saat ada perubahan query dan page? Mungkin akan kita lakukan seperti ini
            </p>
            <pre id="dsdf-2-2"></pre>
            <p class="text-content">Lalu, bagaimana jika terdapat props lain? Apakah kita akan terus menerus menambah
                perbandingan data sebelum dan terbaru di componentDidUpdate()? Atau ada cara lain yang lebih mudah dan aman?
                Solusinya menggunakan useEffect hook</p>
            <pre id="dsdf-2-3"></pre>
            <div class="divider"></div>
            <h4>Saat Optimasi</h4>
            <p class="text-content">Saat kita melakukan optimasi manual menggunakan shouldComponentUpdate(), umumnya kita lupa
                membandingkan props yang merupakan function.</p>
            <pre id="dsdf-3-1"></pre>
            <p class="text-content">Hal tersebut dapat mengakibatkan function membaca nilai state yang
                lampau, melainkan yang terbaru. Seperti kasus berikut, seharusnya ketika button diklik akan membuat kondisi
                button menjadi disable, namun pada kasus ini button mengabaikan pembaruan pada props onClick</p>
            <pre id="dsdf-3-2"></pre>
            <p class="text-content">Bagaimana solusinya? Ingat, bahwa pada tiap render, function akan terbuat ulang alias
                berbeda. Kita dapat melakukan seperti ini</p>
            <pre id="dsdf-3-3"></pre>
            <p class="text-content">Atau dapat menggunakan memo()</p>
            <pre id="dsdf-3-4"></pre>
        </div>
        `

        this.initializeCodemirror()
    }
}

customElements.define('dsdf-page', Dsdf)