from browser import document
import random

# Globale Variable, die alle Variablen enthält
gamestate = {'elements':[], 'activeLine':0, 'activeLetter':0, 'wort':"FFPRG"}

# Setzt ein Buchstabe (wenn sinnvoll)
def buchstabenSetzen(buchstabe):
    global gamestate
    if len(buchstabe)<1:
        return
    buchstabe=buchstabe.upper()[0]
    if buchstabe<"A" or buchstabe>"Z":
        return
    if gamestate['activeLetter']>=5:
        return
    gamestate['elements'][gamestate['activeLine']][gamestate['activeLetter']].innerText = buchstabe
    gamestate['activeLetter']+=1

# Löscht ein Buchstabe (wenn sinnvoll)
def buchstabenLoeschen():
    global gamestate
    if gamestate['activeLetter']==0:
        return
    gamestate['activeLetter']-=1
    el = gamestate['elements'][gamestate['activeLine']][gamestate['activeLetter']]
    el.innerText = ""
    el.className = "normal"

# Markiert die aktuelle Zeile mit 0,1,2 (normal, gelb, gruen)
# bewertung ist ein Array, z.B. [0,1,0,2,0]
def markieren(bewertung):
    global gamestate
    zeile = gamestate['elements'][gamestate['activeLine']]
    for i in range(len(bewertung)):
        zeile[i].className=['normal', 'gelb', 'gruen'][bewertung[i]]

# Gibt das geratene Wort zurück (oder "", wenn das Wort nicht fertig ist)
def geraten():
    global gamestate
    if gamestate['activeLetter']!=5:
        return ""
    zeile = gamestate['elements'][gamestate['activeLine']]
    r = ""
    for i in range(5):
        r += zeile[i].innerText
    return r

# Tastendrücke auswerten
def tastatur(ev):
    global gamestate
    if (ev.key=="Enter" and gamestate['activeLetter']==5):
        guess = geraten()
        print(guess)
        # TODO durch tatsächliche Bewertung ersetzen!
        bewertung = [random.randrange(3) for i in range(5)]
        markieren(bewertung)
        gamestate['activeLetter']=0
        gamestate['activeLine']+=1
        return
    if (ev.key=="Backspace"):
        buchstabenLoeschen()
        return
    if len(ev.key)>1:
        return
    buchstabenSetzen(ev.key)


# Dokument erzeugen
def init():
    global gamestate
    table = document['gametable']
    elements = gamestate['elements']
    for i in range(6):
        tr = document.createElement('tr')
        elements.append([])
        for j in range(5):
            td = document.createElement('td')
            # td.classList.add(['normal', 'gelb', 'gruen'][(i+j)%3])
            td.className = "normal"
            tr.appendChild(td)
            # td.innerText = chr(65+i*3+j)
            elements[-1].append(td)
        table.appendChild(tr)
    document.bind("keydown", tastatur)
    # TODO: Wort auswählen und gamestate['wort'] speichern



init()

