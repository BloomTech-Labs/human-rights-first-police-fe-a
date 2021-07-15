// Make sure to add yourselves and take credit for your hard work! 🎉

const labsCohorts = [
  {
    number: 36,
    students: [
      { name: 'Daniel Kim', githubUser: 'danielbkim', roles: ['tpm'] },
      { name: 'Ryan Hammer', githubUser: 'ryanhammer', roles: ['tpm'] },
      { name: 'Jalpa Shah', githubUser: 'ShahJalpa', roles: ['fe'] },
      { name: 'Alex Pfeifer', githubUser: 'apfeif12', roles: ['fe'] },
      { name: 'Daniel Vargas', githubUser: 'davarg5', roles: ['fe'] },
      { name: 'Leon Nasswetter', githubUser: 'leon-nasswetter', roles: ['fe'] },
      { name: 'Bradley Hubbs', githubUser: 'bradleyhubbs', roles: ['fe'] },
      { name: 'George Vinueza', githubUser: 'g3or3', roles: ['fe'] },
      { name: 'Justin Peczenij', githubUser: 'JustinPeczenij', roles: ['be'] },
      { name: 'Francis Nguyen', githubUser: 'francishtknguyen', roles: ['be'] },
      { name: 'Jaison Alonso', githubUser: 'abe-one', roles: ['be'] },
      { name: 'Hillary Khan', githubUser: 'hillarykhan', roles: ['ds'] },
      { name: 'Eric Park', githubUser: 'ericyeonpark', roles: ['mle'] },
      {
        name: 'Marcos Morales',
        githubUser: 'MarcosMorales2011',
        roles: ['mle'],
      },
    ],
  },
  {
    number: 35,
    students: [
      { name: 'Damaris Garcia', githubUser: 'didi-codes', roles: ['design'] },
      { name: 'Alex Ardanov', githubUser: 'aleksandr-ardanov', roles: ['fe'] },
      {
        name: 'Alexis Marroquin',
        githubUser: 'alexismarroquin7',
        roles: ['fe'],
      },
      {
        name: 'Anas Abdelsalam',
        githubUser: 'yourpersonaltechguy',
        roles: ['fe'],
      },
      { name: 'Anhtuan Tran', githubUser: 'AnhtuanTran-11', roles: ['fe'] },
      { name: 'Casey Cerrito', githubUser: 'CerritoCode0101', roles: ['fe'] },
      { name: 'Hairo Garcia', githubUser: 'xpeedy', roles: ['fe'] },
      { name: 'Jonathan Majors', githubUser: 'izzymajors', roles: ['fe'] },
      { name: 'Jose Robles', githubUser: 'jcrobles1989', roles: ['fe'] },
      {
        name: 'Joshua Samaniego',
        githubUser: 'joshuasamaniego',
        roles: ['fe'],
      },
      { name: 'Kirk Snyder', githubUser: 'krsnyder', roles: ['fe'] },
      {
        name: 'Stephanie Enciso',
        githubUser: 'stephanieenciso',
        roles: ['fe'],
      },
      { name: 'Will Berman', githubUser: 'wberman27', roles: ['fe'] },
      {
        name: 'Caroline Lucas',
        githubUser: 'carolinefallonlucas',
        roles: ['be'],
      },
      { name: 'Max Huckstepp', githubUser: 'mhuckstepp', roles: ['be'] },
      { name: 'Israel Aikulola', githubUser: 'israelaikulola', roles: ['ds'] },
      { name: 'Justin Alirkan', githubUser: 'jalirkan', roles: ['ds'] },
      { name: 'Nathan Fleck', githubUser: 'njfleck24', roles: ['ds'] },
      { name: 'Nico Carvajal', githubUser: 'nicolascarva', roles: ['ds'] },
    ],
  },
  {
    number: 34,
    students: [
      { name: 'Jean Luciano', githubUser: 'jeanluciano', roles: ['fe'] },
      {
        name: 'Steven Mcfarlane',
        githubUser: 'stevenpmcfarlane',
        roles: ['fe'],
      },
      { name: 'Robert Petersen', githubUser: 'robert-petersen', roles: ['fe'] },
      { name: 'Rafael Molina', githubUser: 'rafmolina', roles: ['fe'] },
      { name: 'Mohammed Dawod', githubUser: 'stop0', roles: ['fe'] },
      { name: 'Brandon Santos', githubUser: 'Brandonx1123', roles: ['fe'] },
      { name: 'John Chamberlin', githubUser: 'john-chamberlin', roles: ['fe'] },
      { name: 'Steven Lupsha', githubUser: 'stephenspicer', roles: ['ds'] },
      { name: 'James Sopkin', githubUser: 'Bada-S', roles: ['ds'] },
      { name: 'Joan Villar', githubUser: 'joanRVAllen', roles: ['ds'] },
    ],
  },
  {
    number: 33,
    students: [
      { name: 'Will Mondal', githubUser: 'willmond-al', roles: ['fe'] },
      { name: 'Paul Kim', githubUser: 'lbu0413', roles: ['fe'] },
      {
        name: 'Lindsay Deaton',
        githubUser: 'lindsay-deaton',
        roles: ['fs'],
      },
      { name: 'Ashley Brooks', githubUser: 'AshleyBrooks213', roles: ['ds'] },
      { name: 'Max Moore', githubUser: 'max-moore', roles: ['ds'] },
      { name: 'Austin Francis', githubUser: 'austincfrancis', roles: ['ds'] },
      { name: 'Nathan Partridge', githubUser: 'cswizard11', roles: ['ds'] },
      { name: 'Trey Heaney', githubUser: 'TreyHeaney', roles: ['ds'] },
    ],
  },
  {
    number: 32,
    students: [
      { name: 'Samuel Lee', githubUser: 'AgentSamSA', roles: ['fe'] },
      {
        name: 'Christopher Barrett',
        githubUser: 'Christopher-Barrett',
        roles: ['fe'],
      },
      { name: 'Michael Maton', githubUser: 'michael-maton', roles: ['be'] },
      { name: 'Brett McAdams', githubUser: 'BrettMcAdams', roles: ['be'] },
      { name: 'Josh Carlisle', githubUser: 'Jroc561', roles: ['ds'] },
      { name: 'Max Moore', githubUser: 'max-moore', roles: ['ds'] },
    ],
  },
  {
    number: 31,
    students: [
      {
        name: 'Victoria Mount',
        githubUser: 'victoriamount',
        roles: ['fe'],
      },
      { name: 'Maria Olsen', githubUser: 'mcolsen', roles: ['fe'] },
      { name: 'Sam Tarullo', githubUser: 'starullo', roles: ['fe'] },
      { name: 'Will Wearing', githubUser: 'willwearing', roles: ['fe'] },
      { name: 'Wesley White', githubUser: 'Wesley-Ryan', roles: ['be'] },
      { name: 'Nathan McDonough', githubUser: 'Wesley-Ryan', roles: ['ds'] },
      { name: 'Micah Swain', githubUser: 'Wesley-Ryan', roles: ['ds'] },
    ],
  },
  {
    number: 30,
    students: [
      {
        name: 'Jason Long',
        githubUser: 'jlong5795',
        roles: ['web'],
      },
      { name: 'Mark Rivera', githubUser: 'MarkRivera', roles: ['web'] },
      { name: 'Michael Rockingham', githubUser: 'mrockingham', roles: ['web'] },
      { name: 'Jen Stewart', githubUser: 'jstewart8053', roles: ['web'] },
      {
        name: 'Anthony Carrillo',
        githubUser: 'anthony2698',
        roles: ['web'],
      },
      { name: 'MariaPaula Trujillo', githubUser: 'mtruj013', roles: ['web'] },
      { name: 'Nic Lehman', githubUser: 'npm-nic', roles: ['web'] },
      {
        name: 'Khwanchai Phaipha',
        githubUser: 'khwanchaiwill',
        roles: ['web'],
      },
      { name: 'Idong Essien', githubUser: 'idongessien', roles: ['web'] },
      { name: 'Dondré Jordan', githubUser: 'dondreojordan', roles: ['ds'] },
      { name: 'Santiago Berniz', githubUser: 'sberniz', roles: ['ds'] },
    ],
  },
];

export default labsCohorts;
