/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/**
* Tests unitaires du projet Alcoolémie
* 
*/
MesTestsUnitaires = TestCase('AlcoolemieTest');
MesTestsUnitaires.prototype.testsGetAlcoolPur = function() {
    assertEquals('0 verre', 0, getAlcoolPur(0));
    assertEquals('1 verre', 10, getAlcoolPur(1));
};

MesTestsUnitaires.prototype.testsGetCoefDiffusion = function() {
 assertEquals('Homme', 0.7, getCoefDiffusion('homme'));
 assertEquals('Femme', 0.6, getCoefDiffusion('femme'));
}