<?php

namespace App\Filament\Resources\Talent;

use App\Filament\Resources\Talent\Pages\CreateTalent;
use App\Filament\Resources\Talent\Pages\EditTalent;
use App\Filament\Resources\Talent\Pages\ListTalent;
use App\Filament\Resources\Talent\Schemas\TalentForm;
use App\Filament\Resources\Talent\Tables\TalentTable;
use App\Models\Talent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TalentResource extends Resource
{
    protected static ?string $model = Talent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Schema $schema): Schema
    {
        return TalentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TalentTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTalent::route('/'),
            'create' => CreateTalent::route('/create'),
            'edit' => EditTalent::route('/{record}/edit'),
        ];
    }
}
