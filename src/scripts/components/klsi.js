class KlsiPage extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <h3>Keep the Local State Isolated</h3>
            <img class="dsdf-img" src="../assets/images/klsi.png" alt="Don't Stop the Data Flow">
            <p class="text-content">Hindari membuat state global sesering mungkin. Jangan semua state dimasukan ke dalam
                local state, pertimbangkan semua dengan baik, untuk menghindari terjadinya
                "over-rendering</p>

            <div class="divider"></div>

            <p class="text-content">Ingat, kalau kita tidak yakin apakah suatu state local atau global,
                maka pertimbangkan seperti ini: </p>
            <blockquote>
                "Jika component ini di-render dua kali, apakah interaksi tersebut mempengaruhi
                bagian lain dari aplikasi?"
            </blockquote>

            <p class="text-content">Apabila jawabannya "Tidak", maka gunakan local state</p>

            <p class="text-content">Contoh: </p>
            <ul>
                <li>
                    <p class="text-content"><i>Konten Post.</i> Apabila kita merubah konten Post di Home, maka konten Post kita
                        juga
                        harus berubah di Timeline. Maka gunakan global (Apollo, Relay, atau Redux)</p>
                </li>
                <li>
                    <p class="text-content"><i>Membuka modal.</i> Ketika kita klik tombol kirim Post, maka modal persetujuan
                        akan
                        muncul. Tapi apakah modal persetujuan saat ingin menambahkan komentar juga harus muncul? Tidak. Gunakan
                        local</p>
                </li>
            </ul>
        </div>
        `
    }
}

customElements.define('klsi-page', KlsiPage)