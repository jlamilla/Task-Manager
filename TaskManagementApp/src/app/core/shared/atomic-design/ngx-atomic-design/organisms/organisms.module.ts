import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [CommonModule, MoleculesModule, AtomsModule, ],
})
export class OrganismsModule {}
