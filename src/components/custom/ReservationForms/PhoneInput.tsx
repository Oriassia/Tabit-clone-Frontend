import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Assuming Input is part of the `shadcn` component library

interface Country {
  country: string;
  flagUrl: string;
  dialCode: string;
}

function PhoneInput() {
  const countriesWithFlags = [
    {
      country: "Israel",
      flagUrl: "https://flagcdn.com/w320/il.png",
      dialCode: "+972",
    },
    {
      country: "Afghanistan",
      flagUrl: "https://flagcdn.com/w320/af.png",
      dialCode: "+93",
    },
    {
      country: "Albania",
      flagUrl: "https://flagcdn.com/w320/al.png",
      dialCode: "+355",
    },
    {
      country: "Algeria",
      flagUrl: "https://flagcdn.com/w320/dz.png",
      dialCode: "+213",
    },
    {
      country: "Andorra",
      flagUrl: "https://flagcdn.com/w320/ad.png",
      dialCode: "+376",
    },
    {
      country: "Angola",
      flagUrl: "https://flagcdn.com/w320/ao.png",
      dialCode: "+244",
    },
    {
      country: "Argentina",
      flagUrl: "https://flagcdn.com/w320/ar.png",
      dialCode: "+54",
    },
    {
      country: "Armenia",
      flagUrl: "https://flagcdn.com/w320/am.png",
      dialCode: "+374",
    },
    {
      country: "Australia",
      flagUrl: "https://flagcdn.com/w320/au.png",
      dialCode: "+61",
    },
    {
      country: "Austria",
      flagUrl: "https://flagcdn.com/w320/at.png",
      dialCode: "+43",
    },
    {
      country: "Azerbaijan",
      flagUrl: "https://flagcdn.com/w320/az.png",
      dialCode: "+994",
    },
    {
      country: "Bahamas",
      flagUrl: "https://flagcdn.com/w320/bs.png",
      dialCode: "+1-242",
    },
    {
      country: "Bahrain",
      flagUrl: "https://flagcdn.com/w320/bh.png",
      dialCode: "+973",
    },
    {
      country: "Bangladesh",
      flagUrl: "https://flagcdn.com/w320/bd.png",
      dialCode: "+880",
    },
    {
      country: "Barbados",
      flagUrl: "https://flagcdn.com/w320/bb.png",
      dialCode: "+1-246",
    },
    {
      country: "Belarus",
      flagUrl: "https://flagcdn.com/w320/by.png",
      dialCode: "+375",
    },
    {
      country: "Belgium",
      flagUrl: "https://flagcdn.com/w320/be.png",
      dialCode: "+32",
    },
    {
      country: "Belize",
      flagUrl: "https://flagcdn.com/w320/bz.png",
      dialCode: "+501",
    },
    {
      country: "Benin",
      flagUrl: "https://flagcdn.com/w320/bj.png",
      dialCode: "+229",
    },
    {
      country: "Bhutan",
      flagUrl: "https://flagcdn.com/w320/bt.png",
      dialCode: "+975",
    },
    {
      country: "Bolivia",
      flagUrl: "https://flagcdn.com/w320/bo.png",
      dialCode: "+591",
    },
    {
      country: "Bosnia and Herzegovina",
      flagUrl: "https://flagcdn.com/w320/ba.png",
      dialCode: "+387",
    },
    {
      country: "Botswana",
      flagUrl: "https://flagcdn.com/w320/bw.png",
      dialCode: "+267",
    },
    {
      country: "Brazil",
      flagUrl: "https://flagcdn.com/w320/br.png",
      dialCode: "+55",
    },
    {
      country: "Brunei",
      flagUrl: "https://flagcdn.com/w320/bn.png",
      dialCode: "+673",
    },
    {
      country: "Bulgaria",
      flagUrl: "https://flagcdn.com/w320/bg.png",
      dialCode: "+359",
    },
    {
      country: "Burkina Faso",
      flagUrl: "https://flagcdn.com/w320/bf.png",
      dialCode: "+226",
    },
    {
      country: "Burundi",
      flagUrl: "https://flagcdn.com/w320/bi.png",
      dialCode: "+257",
    },
    {
      country: "Cambodia",
      flagUrl: "https://flagcdn.com/w320/kh.png",
      dialCode: "+855",
    },
    {
      country: "Cameroon",
      flagUrl: "https://flagcdn.com/w320/cm.png",
      dialCode: "+237",
    },
    {
      country: "Canada",
      flagUrl: "https://flagcdn.com/w320/ca.png",
      dialCode: "+1",
    },
    {
      country: "Cape Verde",
      flagUrl: "https://flagcdn.com/w320/cv.png",
      dialCode: "+238",
    },
    {
      country: "Central African Republic",
      flagUrl: "https://flagcdn.com/w320/cf.png",
      dialCode: "+236",
    },
    {
      country: "Chad",
      flagUrl: "https://flagcdn.com/w320/td.png",
      dialCode: "+235",
    },
    {
      country: "Chile",
      flagUrl: "https://flagcdn.com/w320/cl.png",
      dialCode: "+56",
    },
    {
      country: "China",
      flagUrl: "https://flagcdn.com/w320/cn.png",
      dialCode: "+86",
    },
    {
      country: "Colombia",
      flagUrl: "https://flagcdn.com/w320/co.png",
      dialCode: "+57",
    },
    {
      country: "Comoros",
      flagUrl: "https://flagcdn.com/w320/km.png",
      dialCode: "+269",
    },
    {
      country: "Congo (Brazzaville)",
      flagUrl: "https://flagcdn.com/w320/cg.png",
      dialCode: "+242",
    },
    {
      country: "Congo (Kinshasa)",
      flagUrl: "https://flagcdn.com/w320/cd.png",
      dialCode: "+243",
    },
    {
      country: "Costa Rica",
      flagUrl: "https://flagcdn.com/w320/cr.png",
      dialCode: "+506",
    },
    {
      country: "Croatia",
      flagUrl: "https://flagcdn.com/w320/hr.png",
      dialCode: "+385",
    },
    {
      country: "Cuba",
      flagUrl: "https://flagcdn.com/w320/cu.png",
      dialCode: "+53",
    },
    {
      country: "Cyprus",
      flagUrl: "https://flagcdn.com/w320/cy.png",
      dialCode: "+357",
    },
    {
      country: "Czech Republic",
      flagUrl: "https://flagcdn.com/w320/cz.png",
      dialCode: "+420",
    },
    {
      country: "Denmark",
      flagUrl: "https://flagcdn.com/w320/dk.png",
      dialCode: "+45",
    },
    {
      country: "Djibouti",
      flagUrl: "https://flagcdn.com/w320/dj.png",
      dialCode: "+253",
    },
    {
      country: "Dominica",
      flagUrl: "https://flagcdn.com/w320/dm.png",
      dialCode: "+1-767",
    },
    {
      country: "Dominican Republic",
      flagUrl: "https://flagcdn.com/w320/do.png",
      dialCode: "+1-809",
    },
    {
      country: "Ecuador",
      flagUrl: "https://flagcdn.com/w320/ec.png",
      dialCode: "+593",
    },
    {
      country: "Egypt",
      flagUrl: "https://flagcdn.com/w320/eg.png",
      dialCode: "+20",
    },
    {
      country: "El Salvador",
      flagUrl: "https://flagcdn.com/w320/sv.png",
      dialCode: "+503",
    },
    {
      country: "Equatorial Guinea",
      flagUrl: "https://flagcdn.com/w320/gq.png",
      dialCode: "+240",
    },
    {
      country: "Eritrea",
      flagUrl: "https://flagcdn.com/w320/er.png",
      dialCode: "+291",
    },
    {
      country: "Estonia",
      flagUrl: "https://flagcdn.com/w320/ee.png",
      dialCode: "+372",
    },
    {
      country: "Eswatini",
      flagUrl: "https://flagcdn.com/w320/sz.png",
      dialCode: "+268",
    },
    {
      country: "Ethiopia",
      flagUrl: "https://flagcdn.com/w320/et.png",
      dialCode: "+251",
    },
    {
      country: "Fiji",
      flagUrl: "https://flagcdn.com/w320/fj.png",
      dialCode: "+679",
    },
    {
      country: "Finland",
      flagUrl: "https://flagcdn.com/w320/fi.png",
      dialCode: "+358",
    },
    {
      country: "France",
      flagUrl: "https://flagcdn.com/w320/fr.png",
      dialCode: "+33",
    },
    {
      country: "Gabon",
      flagUrl: "https://flagcdn.com/w320/ga.png",
      dialCode: "+241",
    },
    {
      country: "Gambia",
      flagUrl: "https://flagcdn.com/w320/gm.png",
      dialCode: "+220",
    },
    {
      country: "Georgia",
      flagUrl: "https://flagcdn.com/w320/ge.png",
      dialCode: "+995",
    },
    {
      country: "Germany",
      flagUrl: "https://flagcdn.com/w320/de.png",
      dialCode: "+49",
    },
    {
      country: "Ghana",
      flagUrl: "https://flagcdn.com/w320/gh.png",
      dialCode: "+233",
    },
    {
      country: "Greece",
      flagUrl: "https://flagcdn.com/w320/gr.png",
      dialCode: "+30",
    },
    {
      country: "Grenada",
      flagUrl: "https://flagcdn.com/w320/gd.png",
      dialCode: "+1-473",
    },
    {
      country: "Guatemala",
      flagUrl: "https://flagcdn.com/w320/gt.png",
      dialCode: "+502",
    },
    {
      country: "Guinea",
      flagUrl: "https://flagcdn.com/w320/gn.png",
      dialCode: "+224",
    },
    {
      country: "Guinea-Bissau",
      flagUrl: "https://flagcdn.com/w320/gw.png",
      dialCode: "+245",
    },
    {
      country: "Guyana",
      flagUrl: "https://flagcdn.com/w320/gy.png",
      dialCode: "+592",
    },
    {
      country: "Haiti",
      flagUrl: "https://flagcdn.com/w320/ht.png",
      dialCode: "+509",
    },
    {
      country: "Honduras",
      flagUrl: "https://flagcdn.com/w320/hn.png",
      dialCode: "+504",
    },
    {
      country: "Hungary",
      flagUrl: "https://flagcdn.com/w320/hu.png",
      dialCode: "+36",
    },
    {
      country: "Iceland",
      flagUrl: "https://flagcdn.com/w320/is.png",
      dialCode: "+354",
    },
    {
      country: "India",
      flagUrl: "https://flagcdn.com/w320/in.png",
      dialCode: "+91",
    },
    {
      country: "Indonesia",
      flagUrl: "https://flagcdn.com/w320/id.png",
      dialCode: "+62",
    },
    {
      country: "Iran",
      flagUrl: "https://flagcdn.com/w320/ir.png",
      dialCode: "+98",
    },
    {
      country: "Iraq",
      flagUrl: "https://flagcdn.com/w320/iq.png",
      dialCode: "+964",
    },
    {
      country: "Ireland",
      flagUrl: "https://flagcdn.com/w320/ie.png",
      dialCode: "+353",
    },
    {
      country: "Italy",
      flagUrl: "https://flagcdn.com/w320/it.png",
      dialCode: "+39",
    },
    {
      country: "Jamaica",
      flagUrl: "https://flagcdn.com/w320/jm.png",
      dialCode: "+1-876",
    },
    {
      country: "Japan",
      flagUrl: "https://flagcdn.com/w320/jp.png",
      dialCode: "+81",
    },
    {
      country: "Jordan",
      flagUrl: "https://flagcdn.com/w320/jo.png",
      dialCode: "+962",
    },
    {
      country: "Kazakhstan",
      flagUrl: "https://flagcdn.com/w320/kz.png",
      dialCode: "+7",
    },
    {
      country: "Kenya",
      flagUrl: "https://flagcdn.com/w320/ke.png",
      dialCode: "+254",
    },
    {
      country: "Kiribati",
      flagUrl: "https://flagcdn.com/w320/ki.png",
      dialCode: "+686",
    },
    {
      country: "Kuwait",
      flagUrl: "https://flagcdn.com/w320/kw.png",
      dialCode: "+965",
    },
    {
      country: "Kyrgyzstan",
      flagUrl: "https://flagcdn.com/w320/kg.png",
      dialCode: "+996",
    },
    {
      country: "Laos",
      flagUrl: "https://flagcdn.com/w320/la.png",
      dialCode: "+856",
    },
    {
      country: "Latvia",
      flagUrl: "https://flagcdn.com/w320/lv.png",
      dialCode: "+371",
    },
    {
      country: "Lebanon",
      flagUrl: "https://flagcdn.com/w320/lb.png",
      dialCode: "+961",
    },
    {
      country: "Lesotho",
      flagUrl: "https://flagcdn.com/w320/ls.png",
      dialCode: "+266",
    },
    {
      country: "Liberia",
      flagUrl: "https://flagcdn.com/w320/lr.png",
      dialCode: "+231",
    },
    {
      country: "Libya",
      flagUrl: "https://flagcdn.com/w320/ly.png",
      dialCode: "+218",
    },
    {
      country: "Liechtenstein",
      flagUrl: "https://flagcdn.com/w320/li.png",
      dialCode: "+423",
    },
    {
      country: "Lithuania",
      flagUrl: "https://flagcdn.com/w320/lt.png",
      dialCode: "+370",
    },
    {
      country: "Luxembourg",
      flagUrl: "https://flagcdn.com/w320/lu.png",
      dialCode: "+352",
    },
    {
      country: "Madagascar",
      flagUrl: "https://flagcdn.com/w320/mg.png",
      dialCode: "+261",
    },
    {
      country: "Malawi",
      flagUrl: "https://flagcdn.com/w320/mw.png",
      dialCode: "+265",
    },
    {
      country: "Malaysia",
      flagUrl: "https://flagcdn.com/w320/my.png",
      dialCode: "+60",
    },
    {
      country: "Maldives",
      flagUrl: "https://flagcdn.com/w320/mv.png",
      dialCode: "+960",
    },
    {
      country: "Mali",
      flagUrl: "https://flagcdn.com/w320/ml.png",
      dialCode: "+223",
    },
    {
      country: "Malta",
      flagUrl: "https://flagcdn.com/w320/mt.png",
      dialCode: "+356",
    },
    {
      country: "Marshall Islands",
      flagUrl: "https://flagcdn.com/w320/mh.png",
      dialCode: "+692",
    },
    {
      country: "Mauritania",
      flagUrl: "https://flagcdn.com/w320/mr.png",
      dialCode: "+222",
    },
    {
      country: "Mauritius",
      flagUrl: "https://flagcdn.com/w320/mu.png",
      dialCode: "+230",
    },
    {
      country: "Mexico",
      flagUrl: "https://flagcdn.com/w320/mx.png",
      dialCode: "+52",
    },
    {
      country: "Micronesia",
      flagUrl: "https://flagcdn.com/w320/fm.png",
      dialCode: "+691",
    },
    {
      country: "Moldova",
      flagUrl: "https://flagcdn.com/w320/md.png",
      dialCode: "+373",
    },
    {
      country: "Monaco",
      flagUrl: "https://flagcdn.com/w320/mc.png",
      dialCode: "+377",
    },
    {
      country: "Mongolia",
      flagUrl: "https://flagcdn.com/w320/mn.png",
      dialCode: "+976",
    },
    {
      country: "Montenegro",
      flagUrl: "https://flagcdn.com/w320/me.png",
      dialCode: "+382",
    },
    {
      country: "Morocco",
      flagUrl: "https://flagcdn.com/w320/ma.png",
      dialCode: "+212",
    },
    {
      country: "Mozambique",
      flagUrl: "https://flagcdn.com/w320/mz.png",
      dialCode: "+258",
    },
    {
      country: "Myanmar",
      flagUrl: "https://flagcdn.com/w320/mm.png",
      dialCode: "+95",
    },
    {
      country: "Namibia",
      flagUrl: "https://flagcdn.com/w320/na.png",
      dialCode: "+264",
    },
    {
      country: "Nauru",
      flagUrl: "https://flagcdn.com/w320/nr.png",
      dialCode: "+674",
    },
    {
      country: "Nepal",
      flagUrl: "https://flagcdn.com/w320/np.png",
      dialCode: "+977",
    },
    {
      country: "Netherlands",
      flagUrl: "https://flagcdn.com/w320/nl.png",
      dialCode: "+31",
    },
    {
      country: "New Zealand",
      flagUrl: "https://flagcdn.com/w320/nz.png",
      dialCode: "+64",
    },
    {
      country: "Nicaragua",
      flagUrl: "https://flagcdn.com/w320/ni.png",
      dialCode: "+505",
    },
    {
      country: "Niger",
      flagUrl: "https://flagcdn.com/w320/ne.png",
      dialCode: "+227",
    },
    {
      country: "Nigeria",
      flagUrl: "https://flagcdn.com/w320/ng.png",
      dialCode: "+234",
    },
    {
      country: "North Macedonia",
      flagUrl: "https://flagcdn.com/w320/mk.png",
      dialCode: "+389",
    },
    {
      country: "Norway",
      flagUrl: "https://flagcdn.com/w320/no.png",
      dialCode: "+47",
    },
    {
      country: "Oman",
      flagUrl: "https://flagcdn.com/w320/om.png",
      dialCode: "+968",
    },
    {
      country: "Pakistan",
      flagUrl: "https://flagcdn.com/w320/pk.png",
      dialCode: "+92",
    },
    {
      country: "Palau",
      flagUrl: "https://flagcdn.com/w320/pw.png",
      dialCode: "+680",
    },
    {
      country: "Palestine",
      flagUrl: "https://flagcdn.com/w320/ps.png",
      dialCode: "+970",
    },
    {
      country: "Panama",
      flagUrl: "https://flagcdn.com/w320/pa.png",
      dialCode: "+507",
    },
    {
      country: "Papua New Guinea",
      flagUrl: "https://flagcdn.com/w320/pg.png",
      dialCode: "+675",
    },
    {
      country: "Paraguay",
      flagUrl: "https://flagcdn.com/w320/py.png",
      dialCode: "+595",
    },
    {
      country: "Peru",
      flagUrl: "https://flagcdn.com/w320/pe.png",
      dialCode: "+51",
    },
    {
      country: "Philippines",
      flagUrl: "https://flagcdn.com/w320/ph.png",
      dialCode: "+63",
    },
    {
      country: "Poland",
      flagUrl: "https://flagcdn.com/w320/pl.png",
      dialCode: "+48",
    },
    {
      country: "Portugal",
      flagUrl: "https://flagcdn.com/w320/pt.png",
      dialCode: "+351",
    },
    {
      country: "Qatar",
      flagUrl: "https://flagcdn.com/w320/qa.png",
      dialCode: "+974",
    },
    {
      country: "Romania",
      flagUrl: "https://flagcdn.com/w320/ro.png",
      dialCode: "+40",
    },
    {
      country: "Russia",
      flagUrl: "https://flagcdn.com/w320/ru.png",
      dialCode: "+7",
    },
    {
      country: "Rwanda",
      flagUrl: "https://flagcdn.com/w320/rw.png",
      dialCode: "+250",
    },
    {
      country: "Saint Kitts and Nevis",
      flagUrl: "https://flagcdn.com/w320/kn.png",
      dialCode: "+1-869",
    },
    {
      country: "Saint Lucia",
      flagUrl: "https://flagcdn.com/w320/lc.png",
      dialCode: "+1-758",
    },
    {
      country: "Saint Vincent and the Grenadines",
      flagUrl: "https://flagcdn.com/w320/vc.png",
      dialCode: "+1-784",
    },
    {
      country: "Samoa",
      flagUrl: "https://flagcdn.com/w320/ws.png",
      dialCode: "+685",
    },
    {
      country: "San Marino",
      flagUrl: "https://flagcdn.com/w320/sm.png",
      dialCode: "+378",
    },
    {
      country: "Sao Tome and Principe",
      flagUrl: "https://flagcdn.com/w320/st.png",
      dialCode: "+239",
    },
    {
      country: "Saudi Arabia",
      flagUrl: "https://flagcdn.com/w320/sa.png",
      dialCode: "+966",
    },
    {
      country: "Senegal",
      flagUrl: "https://flagcdn.com/w320/sn.png",
      dialCode: "+221",
    },
    {
      country: "Serbia",
      flagUrl: "https://flagcdn.com/w320/rs.png",
      dialCode: "+381",
    },
    {
      country: "Seychelles",
      flagUrl: "https://flagcdn.com/w320/sc.png",
      dialCode: "+248",
    },
    {
      country: "Sierra Leone",
      flagUrl: "https://flagcdn.com/w320/sl.png",
      dialCode: "+232",
    },
    {
      country: "Singapore",
      flagUrl: "https://flagcdn.com/w320/sg.png",
      dialCode: "+65",
    },
    {
      country: "Slovakia",
      flagUrl: "https://flagcdn.com/w320/sk.png",
      dialCode: "+421",
    },
    {
      country: "Slovenia",
      flagUrl: "https://flagcdn.com/w320/si.png",
      dialCode: "+386",
    },
    {
      country: "Solomon Islands",
      flagUrl: "https://flagcdn.com/w320/sb.png",
      dialCode: "+677",
    },
    {
      country: "Somalia",
      flagUrl: "https://flagcdn.com/w320/so.png",
      dialCode: "+252",
    },
    {
      country: "South Africa",
      flagUrl: "https://flagcdn.com/w320/za.png",
      dialCode: "+27",
    },
    {
      country: "South Korea",
      flagUrl: "https://flagcdn.com/w320/kr.png",
      dialCode: "+82",
    },
    {
      country: "South Sudan",
      flagUrl: "https://flagcdn.com/w320/ss.png",
      dialCode: "+211",
    },
    {
      country: "Spain",
      flagUrl: "https://flagcdn.com/w320/es.png",
      dialCode: "+34",
    },
    {
      country: "Sri Lanka",
      flagUrl: "https://flagcdn.com/w320/lk.png",
      dialCode: "+94",
    },
    {
      country: "Sudan",
      flagUrl: "https://flagcdn.com/w320/sd.png",
      dialCode: "+249",
    },
    {
      country: "Suriname",
      flagUrl: "https://flagcdn.com/w320/sr.png",
      dialCode: "+597",
    },
    {
      country: "Sweden",
      flagUrl: "https://flagcdn.com/w320/se.png",
      dialCode: "+46",
    },
    {
      country: "Switzerland",
      flagUrl: "https://flagcdn.com/w320/ch.png",
      dialCode: "+41",
    },
    {
      country: "Syria",
      flagUrl: "https://flagcdn.com/w320/sy.png",
      dialCode: "+963",
    },
    {
      country: "Taiwan",
      flagUrl: "https://flagcdn.com/w320/tw.png",
      dialCode: "+886",
    },
    {
      country: "Tajikistan",
      flagUrl: "https://flagcdn.com/w320/tj.png",
      dialCode: "+992",
    },
    {
      country: "Tanzania",
      flagUrl: "https://flagcdn.com/w320/tz.png",
      dialCode: "+255",
    },
    {
      country: "Thailand",
      flagUrl: "https://flagcdn.com/w320/th.png",
      dialCode: "+66",
    },
    {
      country: "Timor-Leste",
      flagUrl: "https://flagcdn.com/w320/tl.png",
      dialCode: "+670",
    },
    {
      country: "Togo",
      flagUrl: "https://flagcdn.com/w320/tg.png",
      dialCode: "+228",
    },
    {
      country: "Tonga",
      flagUrl: "https://flagcdn.com/w320/to.png",
      dialCode: "+676",
    },
    {
      country: "Trinidad and Tobago",
      flagUrl: "https://flagcdn.com/w320/tt.png",
      dialCode: "+1-868",
    },
    {
      country: "Tunisia",
      flagUrl: "https://flagcdn.com/w320/tn.png",
      dialCode: "+216",
    },
    {
      country: "Turkey",
      flagUrl: "https://flagcdn.com/w320/tr.png",
      dialCode: "+90",
    },
    {
      country: "Turkmenistan",
      flagUrl: "https://flagcdn.com/w320/tm.png",
      dialCode: "+993",
    },
    {
      country: "Tuvalu",
      flagUrl: "https://flagcdn.com/w320/tv.png",
      dialCode: "+688",
    },
    {
      country: "Uganda",
      flagUrl: "https://flagcdn.com/w320/ug.png",
      dialCode: "+256",
    },
    {
      country: "Ukraine",
      flagUrl: "https://flagcdn.com/w320/ua.png",
      dialCode: "+380",
    },
    {
      country: "United Arab Emirates",
      flagUrl: "https://flagcdn.com/w320/ae.png",
      dialCode: "+971",
    },
    {
      country: "United Kingdom",
      flagUrl: "https://flagcdn.com/w320/gb.png",
      dialCode: "+44",
    },
    {
      country: "United States",
      flagUrl: "https://flagcdn.com/w320/us.png",
      dialCode: "+1",
    },
    {
      country: "Uruguay",
      flagUrl: "https://flagcdn.com/w320/uy.png",
      dialCode: "+598",
    },
    {
      country: "Uzbekistan",
      flagUrl: "https://flagcdn.com/w320/uz.png",
      dialCode: "+998",
    },
    {
      country: "Vanuatu",
      flagUrl: "https://flagcdn.com/w320/vu.png",
      dialCode: "+678",
    },
    {
      country: "Vatican City",
      flagUrl: "https://flagcdn.com/w320/va.png",
      dialCode: "+379",
    },
    {
      country: "Venezuela",
      flagUrl: "https://flagcdn.com/w320/ve.png",
      dialCode: "+58",
    },
    {
      country: "Vietnam",
      flagUrl: "https://flagcdn.com/w320/vn.png",
      dialCode: "+84",
    },
    {
      country: "Yemen",
      flagUrl: "https://flagcdn.com/w320/ye.png",
      dialCode: "+967",
    },
    {
      country: "Zambia",
      flagUrl: "https://flagcdn.com/w320/zm.png",
      dialCode: "+260",
    },
    {
      country: "Zimbabwe",
      flagUrl: "https://flagcdn.com/w320/zw.png",
      dialCode: "+263",
    },
  ];

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesWithFlags[0]
  ); // Default to Israel
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove any non-numeric characters
    setPhoneNumber(input);
  };

  const formatPhoneNumber = () => {
    if (!phoneNumber) return;
    let formattedNumber = phoneNumber;

    if (phoneNumber.startsWith("0")) {
      formattedNumber = phoneNumber.substring(1); // Remove the leading '0' if present
    }

    setFormattedPhoneNumber(`${selectedCountry.dialCode}${formattedNumber}`);
  };

  return (
    <div className="flex justify-center items-center align-middle ">
      <Select
        onValueChange={(value: string) =>
          handleCountryChange(
            countriesWithFlags.find((c) => c.country === value)!
          )
        }
      >
        <SelectTrigger className="flex items-center space-x-2 bg-transparent col-span-2 border-b-[1px] border-greyHoverDropDownMenu w-22">
          <img
            src={selectedCountry.flagUrl}
            alt={`${selectedCountry.country} flag`}
            width="30"
            className="inline-block"
          />
          <SelectValue className="bg-transparent col-span-2 border-b-[1px] border-greyHoverDropDownMenu" />
        </SelectTrigger>
        <SelectContent className="min-w-20 max-w-20">
          {countriesWithFlags.map((country) => (
            <SelectItem
              key={country.country}
              value={country.country}
              className="min-w-20 max-w-32 mx-auto  px-1 "
            >
              <img
                src={country.flagUrl}
                alt={`${country.country} flag`}
                width="30"
                className="mx-auto"
              />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input
        id="phoneNumber"
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        onBlur={formatPhoneNumber}
        placeholder="Enter phone number"
        className="w-full border-b-[1px] border-greyHoverDropDownMenu bg-transparent"
      />

      {formattedPhoneNumber && (
        <div className="mt-2">
          <strong>Formatted Phone Number:</strong> {formattedPhoneNumber}
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
