quizes_li_el_list = document.querySelectorAll('.quiz')

quizes = new Map()
for (quizes_li_el of quizes_li_el_list) {
  quiz = {
    title: '',
    due_date: '',
    avail_until: '',
    points: '',
    no_questions: '',
    link: ''
  }
	title_el = quizes_li_el.querySelector('.ig-title')
  quiz.title = title_el.querySelector('span').innerText
  quiz.link = title_el.href
  due_date_el = quizes_li_el.querySelector('.date-due')
  if (due_date_el) {
    due_date_inner_text = due_date_el?.querySelector('.screenreader-only')?.innerText
    if (due_date_inner_text)
      quiz.due_date = DateFromInnerTextDate(due_date_inner_text)
  }
  date_avail_el = quizes_li_el.querySelector('.date-available')
  if (date_avail_el) {
    avail_date_inner_text = date_avail_el?.querySelector('.screenreader-only')?.innerText
    if (avail_date_inner_text)
      quiz.avail_until = DateFromInnerTextDate(avail_date_inner_text)
  }
  quizes[quiz.title] = quiz
}

new_quiz_render_tab = window.open('about:blank', '_blank')
write = (str) => new_quiz_render_tab.document.write(str)
write('<ol>')
for (title in quizes) {
  quiz = quizes[title]
  if (quiz.avail_until && quiz.avail_until.getTime() - Date.now()) {
    practice = quizes[`Practice ${title.substring(0, title.length - ' (Remotely Proctored)'.length)}`]
    write('<li><ul>')
    write(`<li>Title: ${QuizToLink(quiz)}</li>`)
    write(`<li>Due: ${quiz.due_date}\n</li>`)
    write(`<li>Available Until: ${quiz.avail_until}\n</li>`)
    write(`<li>Practice: ${practice ? QuizToLink(practice) : '...'}</li>`)
    write('</ul></li>')
  }
}
write('</ol>')
new_quiz_render_tab.document.close()

function QuizToLink(quiz) {
  return `<a href="${quiz.link}">${quiz.title}</a>`
}

function DateFromInnerTextDate(inner_text_date) {
  month = inner_text_date.substring(0, 3)
  day = parseInt(inner_text_date.substring(4, 6))
  time_h = inner_text_date.slice(-7, -5)
  time_m = inner_text_date.slice(-4, -2)

  if (month == 'Jan')
    month = 0
  else if (month == 'Feb')
    month = 1
  else if (month == 'Mar')
    month = 2
  else if (month == 'Apr')
    month = 4
  else
    month = 5
  return new Date(2021, month, day, time_h, time_m, 59)
}