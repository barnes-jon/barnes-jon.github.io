// Get the buttons and text element
const button_monocytes = document.getElementById('button_monocytes');
const button_lymphocytes = document.getElementById('button_lymphocytes');
const button_bcells = document.getElementById('button_bcells');
const button_tcells = document.getElementById('button_tcells');
const button_neutrophils = document.getElementById('button_neutrophils');
const button_eosinophils = document.getElementById('button_eosinophils');

const text = document.getElementById('text');

// Set the text to "Button 1 was clicked" when button 1 is clicked
button_monocytes.addEventListener('click', function() {
  text.innerHTML = '<h4>Monocytes</h4><p>Monocytes are a type of leukocyte (white blood cell) that are important for fighting infections and promoting tissue repair. Monocytes are produced in the bone marrow and are found in high concentrations in the blood and lymphatic fluids.</p><p>Monocytes are large, phagocytic cells that are able to engulf and digest bacteria and other foreign substances. Monocytes are also able to produce cytokines, which are chemicals that help to stimulate an immune response. When a monocyte encounters a pathogen or other foreign substance, it becomes activated and begins to produce cytokines, which help to recruit other immune cells to the site of the infection.</p><p>Monocytes are important for protecting the body against infections and other immune challenges, and they play a key role in the immune systems response to infections and other immune challenges. Monocytes are also involved in tissue repair and have been shown to play a role in the development of inflammation and scar tissue.</p>';
});

// Set the text to "Button 2 was clicked" when button 2 is clicked
button_lymphocytes.addEventListener('click', function() {
  text.innerHTML = '<h4>Lymphocytes</h4><p>Lymphocytes are a type of leukocyte (white blood cell) that are important for fighting viral infections and other immune challenges. Lymphocytes are produced in the bone marrow and are found in high concentrations in the blood and lymphatic fluids.</p><p>Lymphocytes are important for protecting the body against viral infections and other immune challenges, and they play a key role in the immune systems response to infections and other immune challenges.</p><p>There are two main types of lymphocytes: B cells and T cells. B cells produce antibodies, which are proteins that help to neutralize pathogens, while T cells recognize and attack infected cells.</p>';
});
  
button_bcells.addEventListener('click', function() {
  text.innerHTML = '<h4>B Cells</h4><p>B cells: B cells are produced in the bone marrow and are responsible for producing antibodies. When a B cell encounters a pathogen, it becomes activated and begins to produce antibodies that are specific to that pathogen. The antibodies bind to the pathogen and help to neutralize it, either by directly killing it or by marking it for destruction by other immune cells.</p><p>B cells (also known as B lymphocytes) are a type of immune cell that are important for producing antibodies and providing immunity to the body. B cells are produced in the bone marrow and are found in high concentrations in the blood and lymphatic fluids.</p><p>When a B cell encounters a pathogen, it becomes activated and begins to produce antibodies that are specific to that pathogen. The antibodies bind to the pathogen and help to neutralize it, either by directly killing it or by marking it for destruction by other immune cells.</p><p>B cells are also able to present antigens (proteins from pathogens or other foreign substances) to T cells, which helps to stimulate an immune response.</p><p>B cells are important for protecting the body against infections and other immune challenges, and they play a key role in the immune systems response to infections and other immune challenges.</p>';
});

button_tcells.addEventListener('click', function() {
  text.innerHTML = '<h4>T Cells</h4><p>T cells: T cells are produced in the thymus and are responsible for recognizing and attacking infected cells. T cells recognize infected cells by binding to proteins called antigens that are displayed on the surface of the infected cell. Once an infected cell is recognized, the T cell becomes activated and begins to produce cytokines, which help to stimulate an immune response and recruit other immune cells to the site of the infection.</p>';
});

button_neutrophils.addEventListener('click', function() {
  text.innerHTML = '<h4 > Neutrophils </h4><p>Neutrophils are a type of leukocyte (white blood cell) that are important for protecting the body against bacterial infections. Neutrophils are the most common type of leukocyte and are produced in the bone marrow. Neutrophils are found in high concentrations in the blood and are also able to migrate from the blood into tissues in response to infections and other immune challenges.</p><p>Neutrophils are small, phagocytic cells that are able to engulf and digest bacteria and other foreign substances. Neutrophils are also able to produce chemicals called oxygen radicals, which help to kill bacteria. When a neutrophil encounters a pathogen, it becomes activated and begins to produce oxygen radicals, which help to kill the pathogen and stimulate an immune response.</p><p>Neutrophils are important for protecting the body against bacterial infections and other immune challenges, and they play a key role in the immune systems response to infections and other immune challenges.</p>';
});


button_eosinophils.addEventListener('click', function() {
  text.innerHTML = '<h4> Eosinophils </h4><p>Eosinophils are a type of leukocyte (white blood cell) that are important for fighting parasitic infections and allergies. Eosinophils are produced in the bone marrow and are found in high concentrations in the blood and lymphatic fluids.</p><p>Eosinophils are small, phagocytic cells that are able to engulf and digest parasites and other foreign substances. Eosinophils are also able to produce chemicals called eosinophil cationic proteins, which help to kill parasites and stimulate an immune response. When an eosinophil encounters a parasite or allergen, it becomes activated and begins to produce eosinophil cationic proteins, which help to kill the parasite or allergen and stimulate an immune response.</p><p>Eosinophils are important for protecting the body against parasitic infections and allergies, and they play a key role in the immune systems response to these types of immune challenges.</p>';
});


