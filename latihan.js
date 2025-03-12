const quizQuestions = [
  //variabel yang menyimpan daftar pertanyaan
  {
    question: "Siapa Penemu Atom Pertama Kali?",
    options: [
      "Leucippus & Democritus",
      "John Dalton",
      "Hans Geiger",
      "Ernest Mersden",
    ],
    correctAnswer: "Leucippus & Democritus",
  },
  {
    question: "Teori Atom Rutherford Di Perkenalkan Tahun Berapa?",
    options: ["1991", "1915", "1920", "1911"],
    correctAnswer: "1911",
  },
  {
    question: "Proton Bermuatan?",
    options: ["Negatif", "Positif", "Netral", "Semuanya Benar"],
    correctAnswer: "Positif",
  },
  {
    question: "Berapakah Jumlah Teori Atom?",
    options: ["7", "8", "4", "5"],
    correctAnswer: "5",
  },
  {
    question: "Apa Isi Teori Atom Thomson?",
    options: [
      "Atom yang memiliki muatan positif yang homogen berbentuk seperti bola pejal",
      "Atom adalah bentukan dari bola berongga yang mengandung inti atom dengan muatan positif dan elektron bermuatan negatif yang mengitari atom.",
      "Atom tidak dapat dibagi, dipecah, atau diuraikan menjadi bagian lain.",
      "Atom terdiri dari inti yang bermuatan positif dan di sekitarnya beredar elektron-elektron yang bermuatan negatif",
    ],
    correctAnswer:
      "Atom yang memiliki muatan positif yang homogen berbentuk seperti bola pejal",
  },
];

let currentQuestionIndex = 0;
// Variabel ini menyimpan indeks pertanyaan yang sedang ditampilkan dalam kuis.
//Nilai awalnya 0, artinya kuis akan dimulai dari pertanyaan pertama dalam quizQuestions.
let score = 0;
//Variabel ini menyimpan skor pengguna selama kuis berlangsung.
//Awalnya 0, dan akan bertambah jika pengguna menjawab dengan benar.
let timeLeft = 60;
//Variabel ini menyimpan sisa waktu untuk menyelesaikan kuis dalam hitungan detik.
//Awalnya 60, yang berarti pengguna memiliki 60 detik untuk menyelesaikan kuis.
let timerInterval;
//Variabel ini akan digunakan untuk menyimpan ID interval timer yang menjalankan fungsi hitung mundur.

function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  //Mencari elemen HTML dengan id="start-button".
  //Mengubah gaya (style.display) menjadi "none", sehingga tombol menghilang setelah diklik.
  displayQuestion();
  //Memanggil fungsi displayQuestion() yang bertugas menampilkan pertanyaan pertama dan opsi jawaban.
  startTimer();
  //Memanggil fungsi startTimer() yang menjalankan hitungan mundur untuk kuis
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  //mengambil pertanyaan
  const questionText = document.getElementById("question-text");
  //questionText: Elemen tempat menampilkan teks pertanyaan.
  const answerBttons = document.getElementById("answer-buttons");
  //answerButtons: Elemen tempat menampilkan tombol-tombol jawaban

  questionText.innerHTML = "";
  answerButtons.innerHTML = "";
  //Membersihkan pertanyaan dan pilihan jawaban sebelumnya sebelum menampilkan yang baru.

  questionText.innerHTML = currentQuestion.question;
  //mengambil pertanyaan

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    //membuat elemen <button> baru dalam dokumen HTML.
    button.innerText = option;
    //mengatur opsi menjadi tombol
    button.classList.add("answer-button");
    //menambahkan kelas "answer-button" ke tombol.
    //Kelas ini dapat digunakan dalam CSS untuk memberi gaya pada tombol, seperti warna atau ukuran.
    answerButtons.appendChild(button);
    //elemen HTML tempat semua tombol jawaban ditampilkan

    button.addEventListener("click", function () {
      checkAnswer(option);
      //Menambahkan event listener pada setiap tombol sehingga ketika diklik, akan memanggil fungsi checkAnswer(option) untuk memeriksa apakah jawaban benar atau salah
    });
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  //mengambil objek pertanyaan

  if (selectedOption === currentQuestion.correctAnswer) {
    //selectedOption adalah jawaban yang dipilih pengguna.
    //currentQuestion.correctAnswer adalah jawaban yang benar untuk pertanyaan saat ini.
    //Jika keduanya sama, berarti jawaban benar.
    score++;
    //Jika jawaban benar, skor bertambah 1.
  }

  currentQuestionIndex++;
  //Menambah indeks pertanyaan agar pertanyaan selanjutnya bisa ditampilkan.

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
  //Jika masih ada pertanyaan (currentQuestionIndex < quizQuestions.length), maka panggil displayQuestion() untuk menampilkan pertanyaan berikutnya.
  //Jika semua pertanyaan sudah dijawab, panggil endQuiz() untuk menyelesaikan kuis.
}

function startTimer() {
  timerInterval = setInterval(function () {
    //setInterval() digunakan untuk menjalankan kode di dalamnya setiap 1 detik (1000 ms).
    timeLeft--;
    //Setiap 1 detik, nilai timeLeft berkurang 1.

    document.getElementById("timer").textContent = timeLeft;
    //Mengambil elemen HTML dengan id="timer".
    //Mengubah isi elemen tersebut agar menampilkan waktu yang tersisa.

    if (timeLeft <= 0) {
      endQuiz();
      //Jika timeLeft sudah 0 atau kurang, panggil endQuiz() untuk mengakhiri kuis
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  //untuk menghentikan hitungan mundur

  const scorePercentage = (score / quizQuestions.length) * 100;
  //score adalah jumlah jawaban benar.
  //quizQuestions.length adalah jumlah total pertanyaan

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} out of ${quizQuestions.length}</p>
      <p>Score Percentage: ${scorePercentage}%</p>
    `;
  //Mengambil elemen dengan id="question-container".
  //Mengubah isi elemen tersebut dengan hasil akhir kuis, termasuk skor dan persentasenya.
}

document.getElementById("start-button").addEventListener("click", startQuiz);
