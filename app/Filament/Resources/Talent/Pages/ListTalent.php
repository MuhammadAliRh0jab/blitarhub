<?php

namespace App\Filament\Resources\Talent\Pages;

use App\Filament\Resources\Talent\TalentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTalent extends ListRecords
{
    protected static string $resource = TalentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
