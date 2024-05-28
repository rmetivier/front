# front
Exemple de projet front en Angular

Info pour lancer le projet sur sa machine de DEV:
    <br/> npm install
    <br/> npm start

Info perso pour le déploiement sur infra Contabo:
         
        <br> pour le déploiement du front:
            <br> - faire un npm run build et mettre le contenu de dist dans D:\dev\projets\docrichard\serveurLinuxContabo\dockercompose\favori\distAngular
            <br> - pousser le code sur le serveur
            <br> - relancer le dockercompose 
        <br> pour le back:
            <br> - faire un maven clean install
            <br> - faire une copie du *.jar généré vers *.txt dans   D:\dev\projets\docrichard\serveurLinuxContabo\dockercompose\favori\dockerfileJava 
            <br> - pousser le code sur le serveur
            <br> - refaire une image docker du back, on lance le script /applis/projets/docrichard/serveurLinuxContabo/dockercompose/favori/dockerfileJava/./build...sh
            <br> - relancer le dockercompose 
